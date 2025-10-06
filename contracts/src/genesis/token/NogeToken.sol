// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import {AccessControl} from "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title NOGE (Nova Genesis) Token
 * @notice Advisory token for Nova. Mint/burn restricted to pool role, transfers disabled until enabled by admin..
 */
contract NogeToken is ERC20, AccessControl {
    bytes32 public constant POOL_ROLE = keccak256("POOL_ROLE");

    bool public transfersEnabled;

    error TransfersAlreadyEnabled();
    error TransferRestricted();

    event TransfersEnabled(uint64 timestamp);

    constructor(address admin) ERC20("NOVA Genesis", "NOGE") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    function mint(address to, uint256 amount) external onlyRole(POOL_ROLE) {
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external onlyRole(POOL_ROLE) {
        _burn(from, amount);
    }

    function enableTransfers() external onlyRole(DEFAULT_ADMIN_ROLE) {
        if (transfersEnabled) revert TransfersAlreadyEnabled();
        transfersEnabled = true;
        emit TransfersEnabled(uint64(block.timestamp));
    }

    function _update(address from, address to, uint256 value) internal override {
        if (from != address(0) && to != address(0)) {
            if (!(hasRole(POOL_ROLE, from) || hasRole(POOL_ROLE, to))) {
                if (!transfersEnabled) {
                    revert TransferRestricted();
                }
            }
        }
        super._update(from, to, value);
    }
}
