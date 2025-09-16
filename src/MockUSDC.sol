// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title MockUSDC
 * @notice Lightweight 6-decimal token for Sepolia/testing deposits
 */
contract MockUSDC is ERC20 {
    uint8 private constant DECIMALS = 6;
    address public immutable owner;

    constructor(address initialHolder, uint256 initialSupply) ERC20("Mock USDC", "mUSDC") {
        owner = msg.sender;
        if (initialHolder != address(0) && initialSupply > 0) {
            _mint(initialHolder, initialSupply);
        }
    }

    function decimals() public pure override returns (uint8) {
        return DECIMALS;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == owner, "Only owner");
        _mint(to, amount);
    }
}
