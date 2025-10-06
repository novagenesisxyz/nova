// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Math} from "@openzeppelin/contracts/utils/math/Math.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {NogeToken} from "./token/NogeToken.sol";

/**
 * @title NogeController
 * @notice Flat-ratio NOGE issuance with optional global cap and pool allowlist.
 */
contract NogeController is AccessControl {
    using Math for uint256;

    uint256 private constant ONE = 1e18;
    bytes32 public constant POOL_ROLE = keccak256("POOL_ROLE");

    NogeToken public immutable TOKEN;

    uint256 public ratio; // NOGE per normalized unit
    uint256 public globalCap; // 0 = uncapped

    event GovernanceUpdated(address indexed governance);
    event ParamsUpdated(uint256 ratio, uint256 globalCap);
    event NogeMinted(address indexed user, uint256 depositAmountNormalized, uint256 amountMinted);

    error PoolNotAllowed();
    error InvalidAddress();
    error InvalidDecimals();
    error InvalidRatio();
    error GlobalCapExceeded();

    constructor(address governance_, address token_, uint256 ratio_, uint256 globalCap_) {
        if (governance_ == address(0) || token_ == address(0)) revert InvalidAddress();
        if (ratio_ == 0) revert InvalidRatio();

        TOKEN = NogeToken(token_);
        ratio = ratio_;
        globalCap = globalCap_;

        _grantRole(DEFAULT_ADMIN_ROLE, governance_);
    }

    function setParams(uint256 ratio_, uint256 globalCap_) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (ratio_ == 0) revert InvalidRatio();
        ratio = ratio_;
        globalCap = globalCap_;
        emit ParamsUpdated(ratio_, globalCap_);
    }

    function onDeposit(address beneficiary, uint256 amount, uint8 assetDecimals) external {
        if (!hasRole(POOL_ROLE, msg.sender)) revert PoolNotAllowed();
        if (beneficiary == address(0)) revert InvalidAddress();
        if (assetDecimals > 18) revert InvalidDecimals();
        if (amount == 0) return;

        uint256 normalized = _normalize(amount, assetDecimals);
        uint256 mintAmount = Math.mulDiv(normalized, ratio, ONE);
        if (mintAmount == 0) return;

        uint256 currentSupply = TOKEN.totalSupply();
        if (globalCap != 0 && currentSupply + mintAmount > globalCap) revert GlobalCapExceeded();

        TOKEN.mint(beneficiary, mintAmount);
        emit NogeMinted(beneficiary, normalized, mintAmount);
    }

    function previewMint(uint256 amount, uint8 assetDecimals) external view returns (uint256) {
        if (assetDecimals > 18) revert InvalidDecimals();
        if (amount == 0) return 0;
        uint256 normalized = _normalize(amount, assetDecimals);
        return Math.mulDiv(normalized, ratio, ONE);
    }

    function _normalize(uint256 amount, uint8 assetDecimals) internal pure returns (uint256) {
        if (assetDecimals == 18) {
            return amount;
        }
        uint8 diff = 18 - assetDecimals;
        return amount * (10 ** uint256(diff));
    }
}
