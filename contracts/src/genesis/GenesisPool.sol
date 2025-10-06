// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {IERC20Metadata} from "@openzeppelin/contracts/token/ERC20/extensions/IERC20Metadata.sol";
import {INogeController} from "./interfaces/INogeController.sol";
import {INovaToken} from "./interfaces/INovaToken.sol";
import {IPool} from "@aave/contracts/interfaces/IPool.sol";

/**
 * @title GenesisPool
 * @notice Locks a single stablecoin during Genesis, routes yield, and preserves an immutable ledger for NOVA claims.
 */
contract GenesisPool is ReentrancyGuard, AccessControl, Pausable {
    using SafeERC20 for IERC20;

    IERC20 public immutable ASSET;
    uint8 public immutable ASSET_DECIMALS;
    address public immutable AAVE_TOKEN;
    IPool public immutable LENDING_POOL;

    address public treasury;
    INogeController public nogeController;
    address public novaToken;

    bool public handoffStarted;
    bool public principalHandedOff;
    uint256 public depositCap;
    uint256 public principalBaseline;
    uint256 public immutable DUST_BUFFER;
    uint256 public handoffRemaining;

    mapping(address => uint256) private _principal;

    event Deposited(address indexed user, uint256 amount, uint256 newPrincipalBaseline);
    event YieldSwept(uint256 amount, uint256 newATokenBalance, uint256 principalBaseline);
    event PrincipalHandedOff(address indexed to, uint256 amount, uint64 executedAt, bytes32 externalTxHash);
    event NovaAddressSet(address novaToken);
    event ClaimedNova(address indexed user, uint256 amount);
    event TreasuryUpdated(address treasury);
    event DepositCapUpdated(uint256 newCap);
    event NogeControllerUpdated(address controller);

    error InvalidAddress();
    error AmountZero();
    error CapExceeded();
    error DepositCapTooLow();
    error PrincipalAlreadyHandedOff();
    error PrincipalNotHandedOff();
    error UnsupportedDecimals();
    error NoSweepableYield();
    error NothingToClaim();
    error NovaNotSet();

    constructor(
        address asset_,
        address aToken_,
        address lendingPool_,
        address treasury_,
        address governance_,
        address nogeController_
    ) {
        if (
            asset_ == address(0) || aToken_ == address(0) || lendingPool_ == address(0) || treasury_ == address(0)
                || governance_ == address(0) || nogeController_ == address(0)
        ) {
            revert InvalidAddress();
        }

        ASSET = IERC20(asset_);
        AAVE_TOKEN = aToken_;
        LENDING_POOL = IPool(lendingPool_);

        uint8 decimals = IERC20Metadata(asset_).decimals();
        if (decimals > 18) revert UnsupportedDecimals();
        ASSET_DECIMALS = decimals;

        treasury = treasury_;
        nogeController = INogeController(nogeController_);

        depositCap = 0;
        DUST_BUFFER = 3 * (10 ** uint256(ASSET_DECIMALS));

        _grantRole(DEFAULT_ADMIN_ROLE, governance_);
    }

    // -------------------------
    // User actions
    // -------------------------

    function deposit(uint256 amount) external nonReentrant whenNotPaused {
        if (principalHandedOff) revert PrincipalAlreadyHandedOff();
        if (amount == 0) revert AmountZero();

        uint256 newBaseline = principalBaseline + amount;
        if (depositCap != 0 && newBaseline > depositCap) revert CapExceeded();

        address beneficiary = msg.sender;
        ASSET.safeTransferFrom(beneficiary, address(this), amount);

        _principal[beneficiary] += amount;
        principalBaseline = newBaseline;

        ASSET.forceApprove(address(LENDING_POOL), amount);
        LENDING_POOL.supply(address(ASSET), amount, address(this), 0);
        ASSET.forceApprove(address(LENDING_POOL), 0);

        nogeController.onDeposit(beneficiary, amount, ASSET_DECIMALS);

        emit Deposited(beneficiary, amount, principalBaseline);
    }

    function sweepYield() external nonReentrant onlyRole(DEFAULT_ADMIN_ROLE) {
        if (principalHandedOff) revert PrincipalAlreadyHandedOff();

        uint256 aTokenBalance = IERC20(AAVE_TOKEN).balanceOf(address(this));
        uint256 baseline = principalBaseline;
        uint256 buffer = DUST_BUFFER;
        if (aTokenBalance <= baseline + buffer) revert NoSweepableYield();

        uint256 sweepable = aTokenBalance - baseline - buffer;

        uint256 withdrawn = LENDING_POOL.withdraw(address(ASSET), sweepable, address(this));
        ASSET.safeTransfer(treasury, withdrawn);

        emit YieldSwept(withdrawn, IERC20(AAVE_TOKEN).balanceOf(address(this)), baseline);
    }

    function claimNova(address beneficiary) external nonReentrant {
        if (!principalHandedOff) revert PrincipalNotHandedOff();
        if (novaToken == address(0)) revert NovaNotSet();
        if (beneficiary == address(0)) revert InvalidAddress();

        uint256 amount = _principal[beneficiary];
        if (amount == 0) revert NothingToClaim();

        _principal[beneficiary] = 0;
        principalBaseline -= amount;

        INovaToken(novaToken).mint(beneficiary, amount);

        emit ClaimedNova(beneficiary, amount);
    }

    /**
     * Withdraws principal to `recipient` in one or more chunks during handoff.
     * - Pass `type(uint256).max` to withdraw the caller's entire aToken balance (drain all).
     * - Passing a finite `requestedAmount` greater than the current aToken balance will revert in Aave.
     */
    function handoffPrincipal(address recipient, uint256 requestedAmount, bytes32 externalTxHash)
        external
        nonReentrant
        onlyRole(DEFAULT_ADMIN_ROLE)
        returns (uint256 amount)
    {
        if (recipient == address(0)) revert InvalidAddress();
        if (requestedAmount == 0) revert AmountZero();
        if (principalHandedOff) revert PrincipalAlreadyHandedOff();

        if (!handoffStarted) {
            handoffStarted = true;
            _pause();
        }

        // Forward `requestedAmount` directly to Aave. Use `type(uint256).max` to drain all; otherwise,
        // Aave will revert if the amount exceeds the current aToken balance.
        amount = LENDING_POOL.withdraw(address(ASSET), requestedAmount, recipient);

        uint256 remaining = IERC20(AAVE_TOKEN).balanceOf(address(this));
        handoffRemaining = remaining;

        if (remaining <= DUST_BUFFER) principalHandedOff = true;

        emit PrincipalHandedOff(recipient, amount, uint64(block.timestamp), externalTxHash);
    }

    function setNovaToken(address nova) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (!principalHandedOff) revert PrincipalNotHandedOff();
        if (nova == address(0)) revert InvalidAddress();
        novaToken = nova;
        emit NovaAddressSet(nova);
    }

    // -------------------------
    // Admin setters
    // -------------------------

    function setTreasury(address newTreasury) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newTreasury == address(0)) revert InvalidAddress();
        treasury = newTreasury;
        emit TreasuryUpdated(newTreasury);
    }

    function setDepositCap(uint256 newCap) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newCap != 0 && newCap < principalBaseline) revert DepositCapTooLow();
        depositCap = newCap;
        emit DepositCapUpdated(newCap);
    }

    function setNogeController(address newController) external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (newController == address(0)) revert InvalidAddress();
        nogeController = INogeController(newController);
        emit NogeControllerUpdated(newController);
    }

    function pause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (handoffStarted) revert PrincipalAlreadyHandedOff();
        _unpause();
    }

    // -------------------------
    // Views
    // -------------------------

    function getSweepableYield() external view returns (uint256 sweepable) {
        if (principalHandedOff) return 0;
        uint256 aTokenBalance = IERC20(AAVE_TOKEN).balanceOf(address(this));
        uint256 baseline = principalBaseline;
        uint256 buffer = DUST_BUFFER;
        if (aTokenBalance > baseline + buffer) {
            sweepable = aTokenBalance - baseline - buffer;
        }
    }

    function getUserPrincipal(address user) external view returns (uint256) {
        return _principal[user];
    }
}
