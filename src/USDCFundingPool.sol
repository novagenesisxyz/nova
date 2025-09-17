// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./NovaFundingPoolBase.sol";
import {AaveV3Ethereum, AaveV3EthereumAssets} from "aave-address-book/AaveV3Ethereum.sol";
import {AaveV3Sepolia, AaveV3SepoliaAssets} from "aave-address-book/AaveV3Sepolia.sol";

/**
 * @title USDCFundingPool
 * @notice Single-asset pool for USDC deposits
 */
contract USDCFundingPool is NovaFundingPoolBase {
    constructor(address _nogeToken, address usdcOverride, address providerOverride)
        NovaFundingPoolBase(_nogeToken, _resolveUSDC(usdcOverride), 1e12, _resolveProvider(providerOverride))
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

        revert("USDC not configured");
    }

    function _resolveProvider(address overrideProvider) internal view returns (address) {
        if (overrideProvider != address(0)) {
            return overrideProvider;
        }

        if (block.chainid == 1) {
            return address(AaveV3Ethereum.POOL_ADDRESSES_PROVIDER);
        }

        if (block.chainid == 11155111) {
            return address(AaveV3Sepolia.POOL_ADDRESSES_PROVIDER);
        }

        // Unknown chain: leave integration disabled unless explicitly provided.
        return address(0);
    }
}
