// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import '@openzeppelin/contracts/access/AccessControl.sol';

/**
 * @title NOVAGenesis Token
 * @notice Memecoin token for Nova funding participants
 */
contract NogeToken is ERC20, AccessControl {
    // TODO: Consider not having a pool role and only having the admin role
    //       owned by the Pool contract. Limits potential abuse of the pool role.

    bytes32 public constant POOL_ROLE = keccak256('POOL_ROLE');

    constructor(address admin) ERC20('NOVA Genesis', 'NOGE') {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
    }

    /**
     * @notice Mint new tokens (only authorized pools)
     */
    function mint(address to, uint256 amount) external onlyRole(POOL_ROLE) {
        _mint(to, amount);
    }

    /**
     * @notice Burn tokens (only authorized pools)
     */
    function burn(address from, uint256 amount) external onlyRole(POOL_ROLE) {
        _burn(from, amount);
    }
}
