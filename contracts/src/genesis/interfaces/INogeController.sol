// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

interface INogeController {
    function onDeposit(address beneficiary, uint256 amount, uint8 assetDecimals) external;
}
