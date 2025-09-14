// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/NogeToken.sol";
import "../src/USDCFundingPool.sol";
import "../src/NovaToken.sol";

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

        // Deploy single-asset Funding Pools
        // Deploy single USDC pool using NOGE as receipt
        USDCFundingPool usdcPool = new USDCFundingPool(address(noge));
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
        // Add additional pools here as needed and log their addresses
    }
}