// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/NovaFundingPoolBase.sol";
import "../src/NogeToken.sol";
import "./mocks/MockERC20.sol";
import "./mocks/MockAToken.sol";
import "./mocks/MockPool.sol";
import "./mocks/TestFundingPool.sol";

contract NovaFundingPoolBaseTest is Test {
    // Mirror events for expectEmit
    event Deposited(address indexed user, uint256 amount, uint256 nogeReceived);
    event Withdrawn(address indexed user, uint256 amount);
    // Actors
    address admin = address(this);
    address alice = address(0xA11CE);
    address bob = address(0xB0B);

    // Tokens
    MockERC20 usdc;
    MockAToken aUsdc;
    NogeToken noge;

    // Aave mocks
    MockPool pool;
    MockAddressesProvider provider;

    // System under test
    TestFundingPool fundingPool;

    uint256 constant USDC_DECIMALS = 6;
    uint256 constant DECIMALS_FACTOR = 1e12; // 6 -> 18
    address constant PROVIDER = 0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e;

    function setUp() public {
        // Deploy tokens and pool
        usdc = new MockERC20("USD Coin", "USDC", uint8(USDC_DECIMALS));
        aUsdc = new MockAToken("aUSDC", "aUSDC");
        pool = new MockPool(address(usdc), address(aUsdc));
        aUsdc.setPool(address(pool));

        // Deploy provider and map it to the on-chain provider address used by the base contract
        provider = new MockAddressesProvider(address(pool));
        // Copy runtime code of provider to the canonical provider address
        vm.etch(PROVIDER, address(provider).code);
        // Initialize storage slot 0 (pool address) at the canonical provider address
        vm.store(PROVIDER, bytes32(uint256(0)), bytes32(uint256(uint160(address(pool)))));

        // Deploy NOGE and grant pool role to funding pool after deploy
        noge = new NogeToken(admin);

        // Deploy funding pool targeting our mock addresses provider/pool setup:
        // The base contract calls ADDRESSES_PROVIDER.getPool() in constructor and getReserveData(asset).aTokenAddress.
        // Our MockPool returns its own provider and aToken, so this works for tests.
        fundingPool = new TestFundingPool(address(noge), address(usdc), DECIMALS_FACTOR);

        // Grant POOL_ROLE to funding pool so it can mint/burn NOGE
        noge.grantRole(noge.POOL_ROLE(), address(fundingPool));

        // Seed users with USDC
        usdc.mint(alice, 1_000_000 * 10**USDC_DECIMALS);
        usdc.mint(bob, 1_000_000 * 10**USDC_DECIMALS);
    }

    function _approveAndDeposit(address user, uint256 amount) internal {
        vm.startPrank(user);
        usdc.approve(address(fundingPool), amount);
        fundingPool.deposit(amount);
        vm.stopPrank();
    }

    function testDepositMintsNOGEAndSuppliesToAave() public {
        uint256 amount = 1_000 * 10**USDC_DECIMALS; // 1,000 USDC
        _approveAndDeposit(alice, amount);

        // NOGE minted (18 decimals)
        assertEq(noge.balanceOf(alice), amount * DECIMALS_FACTOR);
        assertEq(noge.totalSupply(), amount * DECIMALS_FACTOR);

        // Principal tracked
        assertEq(fundingPool.totalDeposits(), amount);

        // aTokens minted to pool (pool.mint onBehalfOf = fundingPool)
        assertEq(aUsdc.balanceOf(address(fundingPool)), amount);
    }

    function testWithdrawBurnsNOGEAndReturnsUSDC() public {
        uint256 amount = 2_000 * 10**USDC_DECIMALS;
        _approveAndDeposit(alice, amount);

        // Alice withdraws half
        uint256 withdrawAmount = 1_000 * 10**USDC_DECIMALS;

        // Pre-balances
        uint256 preUser = usdc.balanceOf(alice);
        uint256 prePoolNoge = noge.balanceOf(alice);

        // Approve not required for burn; pool role burns directly
        vm.prank(alice);
        fundingPool.withdraw(withdrawAmount);

        // User received USDC
        assertEq(usdc.balanceOf(alice), preUser + withdrawAmount);
        // NOGE burned
        assertEq(noge.balanceOf(alice), prePoolNoge - withdrawAmount * DECIMALS_FACTOR);
        // Principal reduced
        assertEq(fundingPool.totalDeposits(), amount - withdrawAmount);
        // aTokens reduced at pool
        assertEq(aUsdc.balanceOf(address(fundingPool)), amount - withdrawAmount);
    }

    function testGetAvailableYieldReturnsExcessATokenBalance() public {
        uint256 amount = 1_000 * 10**USDC_DECIMALS;
        _approveAndDeposit(alice, amount);

        // Simulate yield by minting aTokens to the funding pool address directly
        aUsdc.mint(address(fundingPool), 50 * 10**USDC_DECIMALS);

        assertEq(fundingPool.getAvailableYield(), 50 * 10**USDC_DECIMALS);
    }

    function testOwnerCanWithdrawYield() public {
        uint256 amount = 5_000 * 10**USDC_DECIMALS;
        _approveAndDeposit(alice, amount);
        aUsdc.mint(address(fundingPool), 500 * 10**USDC_DECIMALS); // simulate yield (increase aToken balance)
        usdc.mint(address(pool), 500 * 10**USDC_DECIMALS); // back the yield with underlying in pool

        uint256 pre = usdc.balanceOf(admin);
        fundingPool.withdrawYield(200 * 10**USDC_DECIMALS, admin);
        assertEq(usdc.balanceOf(admin), pre + 200 * 10**USDC_DECIMALS);
        assertEq(fundingPool.getAvailableYield(), 300 * 10**USDC_DECIMALS);
    }

    function testWithdrawYieldRevertsIfExceedsAvailable() public {
        uint256 amount = 1_000 * 10**USDC_DECIMALS;
        _approveAndDeposit(alice, amount);
        aUsdc.mint(address(fundingPool), 10 * 10**USDC_DECIMALS);

        vm.expectRevert(bytes("Exceeds available yield"));
        fundingPool.withdrawYield(20 * 10**USDC_DECIMALS, admin);
    }

    function testDepositRevertsOnZero() public {
        vm.prank(alice);
        vm.expectRevert(bytes("Amount must be greater than 0"));
        fundingPool.deposit(0);
    }

    function testPauseAndUnpause() public {
        // Pause
        fundingPool.pause();
        vm.prank(alice);
        vm.expectRevert();
        fundingPool.deposit(1);

        // Unpause and deposit works
        fundingPool.unpause();
        _approveAndDeposit(alice, 100 * 10**USDC_DECIMALS);
    }

    function testOnlyOwnerCanPauseAndWithdrawYield() public {
        vm.prank(alice);
        vm.expectRevert();
        fundingPool.pause();

        vm.prank(alice);
        vm.expectRevert();
        fundingPool.withdrawYield(1, alice);
    }

    function testEventsOnDepositAndWithdraw() public {
        uint256 amount = 1_234 * 10**USDC_DECIMALS;
        vm.startPrank(alice);
        usdc.approve(address(fundingPool), amount);
        vm.expectEmit(true, false, false, true);
        emit Deposited(alice, amount, amount * DECIMALS_FACTOR);
        fundingPool.deposit(amount);
        vm.stopPrank();

        vm.prank(alice);
        vm.expectEmit(true, false, false, true);
        emit Withdrawn(alice, 100 * 10**USDC_DECIMALS);
        fundingPool.withdraw(100 * 10**USDC_DECIMALS);
    }

    function testWithdrawMoreThanBalanceRevertsOnBurn() public {
        uint256 amount = 1_000 * 10**USDC_DECIMALS;
        _approveAndDeposit(alice, amount);

        // Alice only has NOGE for 1,000 USDC; try to withdraw 1,500
        vm.prank(alice);
        vm.expectRevert();
        fundingPool.withdraw(1_500 * 10**USDC_DECIMALS);
    }

    function testWithdrawYieldInvalidRecipientReverts() public {
        uint256 amount = 1_000 * 10**USDC_DECIMALS;
        _approveAndDeposit(alice, amount);
        aUsdc.mint(address(fundingPool), 100 * 10**USDC_DECIMALS);
        usdc.mint(address(pool), 100 * 10**USDC_DECIMALS);

        vm.expectRevert(bytes("Invalid recipient"));
        fundingPool.withdrawYield(1, address(0));
    }
}


