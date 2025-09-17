// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/NogeToken.sol";
import "../src/USDCFundingPool.sol";
import "../src/NovaToken.sol";
import "../src/MockUSDC.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");

        vm.startBroadcast(deployerPrivateKey);

        address deployer = vm.addr(deployerPrivateKey);

        // Deploy NOVA token with deployer as initial owner
        NovaToken nova = new NovaToken(deployer);
        console.log("NOVA Token deployed at:", address(nova));

        // NOGE receipt token
        NogeToken noge = new NogeToken(deployer);
        console.log("NOGE Token deployed at:", address(noge));

        address usdcAddress;

        // Optional: use existing USDC if provided, otherwise deploy a mock token for testing
        if (vm.envOr("USDC_ADDRESS", address(0)) != address(0)) {
            usdcAddress = vm.envAddress("USDC_ADDRESS");
            console.log("Using existing USDC at:", usdcAddress);
        } else {
            MockUSDC mockUsdc = new MockUSDC(deployer, 1_000_000 * 1e6);
            usdcAddress = address(mockUsdc);
            console.log("Mock USDC deployed at:", usdcAddress);
            console.log("Minted 1,000,000 mUSDC to deployer for testing");
        }

        // Deploy single-asset Funding Pools
        // Deploy single USDC pool using NOGE as receipt. Pass optional overrides so
        // the contract can auto-wire the proper Aave addresses per chain when zero.
        address providerOverride = vm.envOr("AAVE_ADDRESSES_PROVIDER", address(0));
        USDCFundingPool usdcPool = new USDCFundingPool(address(noge), usdcAddress, providerOverride);
        console.log("USDC Funding Pool deployed at:", address(usdcPool));

        // Authorize pool to mint/burn NOGE
        bytes32 poolRole = noge.POOL_ROLE();
        noge.grantRole(poolRole, address(usdcPool));
        console.log("Granted POOL_ROLE to USDC pool");

        vm.stopBroadcast();

        // Log deployment addresses for frontend configuration
        console.log("\n=== Deployment Complete ===");
        console.log("Add these to your .env file:");
        console.log("NEXT_PUBLIC_NOVA_TOKEN_ADDRESS=", address(nova));
        console.log("NEXT_PUBLIC_NOGE_TOKEN_ADDRESS=", address(noge));
        console.log("NEXT_PUBLIC_FUNDING_POOL_USDC_ADDRESS=", address(usdcPool));
        console.log("NEXT_PUBLIC_USDC_ADDRESS=", usdcAddress);
        // Add additional pools here as needed and log their addresses
    }
}
