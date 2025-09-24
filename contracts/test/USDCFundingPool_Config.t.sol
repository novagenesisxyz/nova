// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/USDCFundingPool.sol";
import "../src/NogeToken.sol";
import "./mocks/MockERC20.sol";
import "./mocks/MockPool.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "aave-address-book/AaveV3Ethereum.sol";
import "aave-address-book/AaveV3Sepolia.sol";

contract USDCFundingPoolConfigTest is Test {
    NogeToken noge;

    function setUp() public {
        noge = new NogeToken(address(this));
    }

    function _mockApprovals(address token, address spender) internal {
        vm.mockCall(
            token,
            abi.encodeWithSelector(IERC20.approve.selector, spender, 0),
            abi.encode(true)
        );
        vm.mockCall(
            token,
            abi.encodeWithSelector(IERC20.approve.selector, spender, type(uint256).max),
            abi.encode(true)
        );
    }

    function _mockProvider(address provider, address pool, address asset, address aToken) internal {
        vm.mockCall(
            provider,
            abi.encodeWithSelector(IAaveAddressesProvider.getPool.selector),
            abi.encode(pool)
        );
        vm.mockCall(
            pool,
            abi.encodeWithSelector(IAavePool.getReserveData.selector, asset),
            abi.encode(ReserveData({aTokenAddress: aToken}))
        );
    }

    function testMainnetDefaultsUseAddressBook() public {
        vm.chainId(1);
        address provider = address(AaveV3Ethereum.POOL_ADDRESSES_PROVIDER);
        address poolAddress = address(AaveV3Ethereum.POOL);
        address usdc = AaveV3EthereumAssets.USDC_UNDERLYING;
        address aToken = AaveV3EthereumAssets.USDC_A_TOKEN;

        _mockProvider(provider, poolAddress, usdc, aToken);
        _mockApprovals(usdc, poolAddress);

        USDCFundingPool fundingPool = new USDCFundingPool(address(noge), address(0), address(0));

        assertEq(fundingPool.TOKEN(), usdc);
        assertEq(address(fundingPool.addressesProvider()), provider);
        assertEq(address(fundingPool.AAVE_POOL()), poolAddress);
        assertTrue(fundingPool.useAave());
    }

    function testSepoliaDefaultsUseAddressBook() public {
        vm.chainId(11155111);
        address provider = address(AaveV3Sepolia.POOL_ADDRESSES_PROVIDER);
        address poolAddress = address(AaveV3Sepolia.POOL);
        address usdc = AaveV3SepoliaAssets.USDC_UNDERLYING;
        address aToken = AaveV3SepoliaAssets.USDC_A_TOKEN;

        _mockProvider(provider, poolAddress, usdc, aToken);
        _mockApprovals(usdc, poolAddress);

        USDCFundingPool fundingPool = new USDCFundingPool(address(noge), address(0), address(0));

        assertEq(fundingPool.TOKEN(), usdc);
        assertEq(address(fundingPool.addressesProvider()), provider);
        assertEq(address(fundingPool.AAVE_POOL()), poolAddress);
        assertTrue(fundingPool.useAave());
    }

    function testUnsupportedChainRequiresUSDCOverride() public {
        vm.chainId(31337);
        vm.expectRevert(bytes("USDC not configured"));
        new USDCFundingPool(address(noge), address(0), address(0));
    }

    function testCustomAddressesDisableAaveWhenProviderUnset() public {
        vm.chainId(31337);
        MockERC20 mockUsdc = new MockERC20("Mock", "MCK", 6);

        USDCFundingPool fundingPool = new USDCFundingPool(address(noge), address(mockUsdc), address(0));

        assertEq(fundingPool.TOKEN(), address(mockUsdc));
        assertEq(address(fundingPool.addressesProvider()), address(0));
        assertFalse(fundingPool.useAave());
    }

    function testProviderWithoutListingDisablesAave() public {
        vm.chainId(11155111);
        MockERC20 mockUsdc = new MockERC20("Mock", "MCK", 6);
        MockPool pool = new MockPool(address(mockUsdc), address(0));
        MockAddressesProvider provider = pool.provider();

        USDCFundingPool fundingPool = new USDCFundingPool(address(noge), address(mockUsdc), address(provider));

        assertEq(fundingPool.TOKEN(), address(mockUsdc));
        assertEq(address(fundingPool.addressesProvider()), address(0));
        assertEq(address(fundingPool.AAVE_POOL()), address(0));
        assertFalse(fundingPool.useAave());
    }
}
