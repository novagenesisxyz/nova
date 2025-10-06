// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Script} from "forge-std/Script.sol";
import {console2 as console} from "forge-std/console2.sol";

import {NogeToken} from "../src/genesis/token/NogeToken.sol";
import {NogeController} from "../src/genesis/NogeController.sol";
import {GenesisPool} from "../src/genesis/GenesisPool.sol";

import {MockERC20} from "../test/mocks/MockERC20.sol";
import {MockAToken} from "../test/mocks/MockAToken.sol";
import {MockAavePool} from "../test/mocks/MockAavePool.sol";

contract DeployGenesisScript is Script {
    struct DeploymentConfig {
        address governance;
        address treasury;
        address asset;
        address aToken;
        address lendingPool;
        uint256 depositCap;
        uint256 nogeRatio;
        uint256 nogeGlobalCap;
    }

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        address deployer = vm.addr(deployerPrivateKey);
        DeploymentConfig memory config = _loadConfig(deployer);

        MockERC20 mockAsset;
        MockAToken mockAToken;
        MockAavePool mockPool;
        (config, mockAsset, mockAToken, mockPool) = _ensureAddresses(config, deployer);

        // Deploy NOGE token governed by `config.governance`
        NogeToken noge = new NogeToken(config.governance);
        console.log("NOGE token deployed:", address(noge));

        // Deploy controller with flat ratio
        NogeController controller =
            new NogeController(config.governance, address(noge), config.nogeRatio, config.nogeGlobalCap);
        console.log("NOGE controller deployed:", address(controller));

        // Deploy Genesis pool
        GenesisPool pool = new GenesisPool(
            config.asset, config.aToken, config.lendingPool, config.treasury, config.governance, address(controller)
        );
        console.log("Genesis pool deployed:", address(pool));

        // Wire roles
        noge.grantRole(noge.POOL_ROLE(), address(controller));
        controller.grantRole(controller.POOL_ROLE(), address(pool));
        console.log("Access control wired.");

        // Optionally set deposit cap if deployer is governance
        if (config.depositCap != 0) {
            if (config.governance == deployer) {
                pool.setDepositCap(config.depositCap);
                console.log("Deposit cap set to:", config.depositCap);
            } else {
                console.log(
                    "Governance is not deployer; skipping deposit cap set. Governance multisig must call setDepositCap manually."
                );
            }
        }

        vm.stopBroadcast();

        console.log("\n=== Deployment Complete ===");
        console.log("Add these to your frontend .env:");
        console.log("NEXT_PUBLIC_GENESIS_POOL_ADDRESS=", address(pool));
        console.log("NEXT_PUBLIC_NOGE_TOKEN_ADDRESS=", address(noge));
        console.log("NEXT_PUBLIC_ASSET_ADDRESS=", config.asset);
        console.log("NEXT_PUBLIC_TREASURY_ADDRESS=", config.treasury);
        console.log("NEXT_PUBLIC_CHAIN_ID=", vm.toString(block.chainid));

        if (address(mockAsset) != address(0)) {
            console.log("\nMock deployment details:");
            console.log("Mock USDC:", address(mockAsset));
            console.log("Mock aToken:", address(mockAToken));
            console.log("Mock Aave Pool:", address(mockPool));
        }
    }

    function _loadConfig(address deployer) internal returns (DeploymentConfig memory config) {
        address governance = vm.envOr("GOVERNANCE_ADDRESS", deployer);
        address treasury;
        if (vm.envExists("TREASURY_ADDRESS")) {
            treasury = vm.envAddress("TREASURY_ADDRESS");
        }
        if (treasury == address(0)) revert("TREASURY_ADDRESS env var required");

        config.governance = governance;
        config.treasury = treasury;

        if (vm.envExists("ASSET_ADDRESS")) {
            config.asset = vm.envAddress("ASSET_ADDRESS");
        }
        if (vm.envExists("ATOKEN_ADDRESS")) {
            config.aToken = vm.envAddress("ATOKEN_ADDRESS");
        }
        if (vm.envExists("LENDING_POOL_ADDRESS")) {
            config.lendingPool = vm.envAddress("LENDING_POOL_ADDRESS");
        }

        config.depositCap = vm.envOr("DEPOSIT_CAP", uint256(0));
        config.nogeRatio = vm.envOr("NOGE_RATIO", uint256(100e18));
        config.nogeGlobalCap = vm.envOr("NOGE_GLOBAL_CAP", uint256(0));
    }

    function _ensureAddresses(DeploymentConfig memory config, address deployer)
        internal
        returns (DeploymentConfig memory updated, MockERC20 mockAsset, MockAToken mockAToken, MockAavePool mockPool)
    {
        bool hasAsset = config.asset != address(0);
        bool hasAToken = config.aToken != address(0);
        bool hasLendingPool = config.lendingPool != address(0);
        if (hasAsset && hasAToken && hasLendingPool) {
            return (config, mockAsset, mockAToken, mockPool);
        }

        if (hasAsset || hasAToken || hasLendingPool) {
            revert("Provide ASSET_ADDRESS, ATOKEN_ADDRESS, and LENDING_POOL_ADDRESS together or omit all.");
        }

        console.log("No asset addresses provided. Deploying mocks for local testing.");
        mockAsset = new MockERC20("Mock USD Coin", "mUSDC", 6);
        mockAsset.mint(deployer, 1_000_000e6);

        mockAToken = new MockAToken("Mock aUSDC", "maUSDC");
        mockPool = new MockAavePool(address(mockAsset), address(mockAToken));
        mockAToken.setPool(address(mockPool));

        config.asset = address(mockAsset);
        config.aToken = address(mockAToken);
        config.lendingPool = address(mockPool);

        return (config, mockAsset, mockAToken, mockPool);
    }
}
