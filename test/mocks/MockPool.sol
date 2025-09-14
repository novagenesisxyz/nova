// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {IPoolAddressesProvider} from "../../lib/aave-v3-core/contracts/interfaces/IPoolAddressesProvider.sol";
import {IPool} from "../../lib/aave-v3-core/contracts/interfaces/IPool.sol";
import {DataTypes} from "../../lib/aave-v3-core/contracts/protocol/libraries/types/DataTypes.sol";
import "./MockAToken.sol";
import "./MockERC20.sol";

contract MockAddressesProvider is IPoolAddressesProvider {
    address private _pool;
    constructor(address pool_) { _pool = pool_; }
    function getMarketId() external view returns (string memory) { return "MOCK"; }
    function setMarketId(string calldata) external {}
    function owner() external view returns (address) { return address(0); }
    function transferOwnership(address) external {}
    function getAddress(bytes32) external view returns (address) { return address(0); }
    function setAddress(bytes32, address) external {}
    function setAddressAsProxy(bytes32, address) external {}
    function getPool() external view returns (address) { return _pool; }
    function setPoolImpl(address) external {}
    function getPoolConfigurator() external view returns (address) { return address(0); }
    function setPoolConfiguratorImpl(address) external {}
    function getPriceOracle() external view returns (address) { return address(0); }
    function setPriceOracle(address) external {}
    function getACLManager() external view returns (address) { return address(0); }
    function setACLManager(address) external {}
    function getACLAdmin() external view returns (address) { return address(0); }
    function setACLAdmin(address) external {}
    function getPriceOracleSentinel() external view returns (address) { return address(0); }
    function setPriceOracleSentinel(address) external {}
    function getPoolDataProvider() external view returns (address) { return address(0); }
    function setPoolDataProvider(address) external {}
    function getRoleManager() external view returns (address) { return address(0); }
}

contract MockPool is IPool {
    MockAddressesProvider public provider;
    address public aToken;
    address public asset;

    constructor(address underlying, address aToken_) {
        asset = underlying;
        aToken = aToken_;
        provider = new MockAddressesProvider(address(this));
    }

    function ADDRESSES_PROVIDER() external view returns (IPoolAddressesProvider) {
        return provider;
    }

    function getReserveData(address) external view returns (DataTypes.ReserveData memory data) {
        data.aTokenAddress = aToken;
    }

    function supply(address asset_, uint256 amount, address onBehalfOf, uint16) external {
        require(asset_ == asset, "asset");
        // pull underlying from caller
        MockERC20(asset).transferFrom(msg.sender, address(this), amount);
        // mint aTokens to onBehalfOf
        MockAToken(aToken).mint(onBehalfOf, amount);
    }

    function withdraw(address asset_, uint256 amount, address to) external returns (uint256) {
        require(asset_ == asset, "asset");
        // burn aTokens from caller (pool holds them)
        MockAToken(aToken).burn(msg.sender, amount);
        // transfer underlying to 'to'
        MockERC20(asset).transfer(to, amount);
        return amount;
    }

    // -------- unused interface parts below (no-op) --------
    function mintUnbacked(address, uint256, address, uint16) external {}
    function backUnbacked(address, uint256, uint256) external returns (uint256) { return 0; }
    function supplyWithPermit(address, uint256, address, uint16, uint256, uint8, bytes32, bytes32) external {}
    function borrow(address, uint256, uint256, uint16, address) external {}
    function repay(address, uint256, uint256, address) external returns (uint256) { return 0; }
    function repayWithPermit(address, uint256, uint256, address, uint256, uint8, bytes32, bytes32) external returns (uint256) { return 0; }
    function repayWithATokens(address, uint256, uint256) external returns (uint256) { return 0; }
    function swapBorrowRateMode(address, uint256) external {}
    function rebalanceStableBorrowRate(address, address) external {}
    function setUserUseReserveAsCollateral(address, bool) external {}
    function liquidationCall(address, address, address, uint256, bool) external {}
    function flashLoan(address, address[] calldata, uint256[] calldata, uint256[] calldata, address, bytes calldata, uint16) external {}
    function flashLoanSimple(address, address, uint256, bytes calldata, uint16) external {}
    function getUserAccountData(address) external view returns (uint256, uint256, uint256, uint256, uint256, uint256) { return (0,0,0,0,0,0); }
    function initReserve(address, address, address, address, address) external {}
    function dropReserve(address) external {}
    function setReserveInterestRateStrategyAddress(address, address) external {}
    function setConfiguration(address, DataTypes.ReserveConfigurationMap calldata) external {}
    function getConfiguration(address) external view returns (DataTypes.ReserveConfigurationMap memory) { return DataTypes.ReserveConfigurationMap(0); }
    function getUserConfiguration(address) external view returns (DataTypes.UserConfigurationMap memory) { return DataTypes.UserConfigurationMap(0); }
    function getReserveNormalizedIncome(address) external view returns (uint256) { return 0; }
    function getReserveNormalizedVariableDebt(address) external view returns (uint256) { return 0; }
    function finalizeTransfer(address, address, address, uint256, uint256, uint256) external {}
    function getReservesList() external view returns (address[] memory) { return new address[](0); }
    function getReserveAddressById(uint16) external view returns (address) { return address(0); }
    function updateBridgeProtocolFee(uint256) external {}
    function updateFlashloanPremiums(uint128, uint128) external {}
    function configureEModeCategory(uint8, DataTypes.EModeCategory memory) external {}
    function getEModeCategoryData(uint8) external view returns (DataTypes.EModeCategory memory) { return DataTypes.EModeCategory(0,0,0,address(0),""); }
    function setUserEMode(uint8) external {}
    function getUserEMode(address) external view returns (uint256) { return 0; }
    function resetIsolationModeTotalDebt(address) external {}
    function MAX_STABLE_RATE_BORROW_SIZE_PERCENT() external view returns (uint256) { return 0; }
    function FLASHLOAN_PREMIUM_TOTAL() external view returns (uint128) { return 0; }
    function BRIDGE_PROTOCOL_FEE() external view returns (uint256) { return 0; }
    function FLASHLOAN_PREMIUM_TO_PROTOCOL() external view returns (uint128) { return 0; }
    function MAX_NUMBER_RESERVES() external view returns (uint16) { return 0; }
    function mintToTreasury(address[] calldata) external {}
    function rescueTokens(address, address, uint256) external {}
    function deposit(address, uint256, address, uint16) external {}
}


