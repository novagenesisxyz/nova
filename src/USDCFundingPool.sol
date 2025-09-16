// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NovaFundingPoolBase.sol";

/**
 * @title USDCFundingPool
 * @notice Single-asset pool for USDC deposits
 */
contract USDCFundingPool is NovaFundingPoolBase {
    constructor(address _nogeToken, address _usdc, address _addressesProvider)
        NovaFundingPoolBase(_nogeToken, _usdc, 1e12, _addressesProvider) // 6 -> 18 decimals
    {}
}

