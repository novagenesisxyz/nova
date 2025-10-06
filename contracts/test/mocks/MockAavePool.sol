// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

import {MockAToken} from "./MockAToken.sol";
import {MockERC20} from "./MockERC20.sol";

contract MockAavePool {
    using SafeERC20 for IERC20;

    address public immutable ASSET;
    MockAToken public immutable A_TOKEN;

    constructor(address asset_, address aToken_) {
        ASSET = asset_;
        A_TOKEN = MockAToken(aToken_);
    }

    function supply(address asset_, uint256 amount, address onBehalfOf, uint16) external {
        require(asset_ == ASSET, "asset");
        IERC20(ASSET).safeTransferFrom(msg.sender, address(this), amount);
        A_TOKEN.mint(onBehalfOf, amount);
    }

    function withdraw(address asset_, uint256 amount, address to) external returns (uint256) {
        require(asset_ == ASSET, "asset");
        uint256 userBalance = A_TOKEN.balanceOf(msg.sender);
        uint256 amountToWithdraw = amount;
        if (amount == type(uint256).max) {
            amountToWithdraw = userBalance;
        } else {
            require(amount <= userBalance, "insufficient aToken");
        }
        A_TOKEN.burn(msg.sender, amountToWithdraw);
        IERC20(ASSET).safeTransfer(to, amountToWithdraw);
        return amountToWithdraw;
    }

    function accrueYield(address beneficiary, uint256 amount) external {
        MockERC20(ASSET).mint(address(this), amount);
        A_TOKEN.mint(beneficiary, amount);
    }
}
