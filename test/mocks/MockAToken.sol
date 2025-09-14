// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @dev Simplified aToken: 1:1 with underlying; pool mints/burns on supply/withdraw.
 */
contract MockAToken is ERC20 {
    address public pool;
    address private initializer;

    constructor(string memory name_, string memory symbol_) ERC20(name_, symbol_) {
        initializer = msg.sender;
    }

    function setPool(address pool_) external {
        require(msg.sender == initializer && pool == address(0), "set once");
        pool = pool_;
    }

    function mint(address to, uint256 amount) external {
        require(msg.sender == pool, "only pool");
        _mint(to, amount);
    }

    function burn(address from, uint256 amount) external {
        require(msg.sender == pool, "only pool");
        _burn(from, amount);
    }
}


