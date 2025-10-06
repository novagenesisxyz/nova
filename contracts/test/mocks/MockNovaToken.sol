// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract MockNovaToken {
    mapping(address => uint256) public minted;

    event Minted(address indexed to, uint256 amount);

    function mint(address to, uint256 amount) external {
        minted[to] += amount;
        emit Minted(to, amount);
    }
}
