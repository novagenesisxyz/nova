// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {AaveV3EthereumAssets} from 'aave-address-book/AaveV3Ethereum.sol';
import {AaveV3SepoliaAssets} from 'aave-address-book/AaveV3Sepolia.sol';

import './NovaFundingPoolBase.sol';

error InvalidUSDC();

/**
 * @title USDCFundingPool
 * @notice Single-asset pool for USDC deposits
 */
contract USDCFundingPool is NovaFundingPoolBase {
    constructor(address _nogeToken, address usdcOverride)
        NovaFundingPoolBase(_nogeToken, _resolveUSDC(usdcOverride), 1e12)
    {}

    function _resolveUSDC(address overrideAddress) internal view returns (address) {
        if (overrideAddress != address(0)) {
            return overrideAddress;
        }

        if (block.chainid == 1) {
            return AaveV3EthereumAssets.USDC_UNDERLYING;
        }

        if (block.chainid == 11155111) {
            return AaveV3SepoliaAssets.USDC_UNDERLYING;
        }

        revert InvalidUSDC();
    }
}
