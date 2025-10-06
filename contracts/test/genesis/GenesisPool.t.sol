// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {Pausable} from "@openzeppelin/contracts/utils/Pausable.sol";

import {GenesisPool} from "../../src/genesis/GenesisPool.sol";
import {NogeController} from "../../src/genesis/NogeController.sol";
import {NogeToken} from "../../src/genesis/token/NogeToken.sol";
import {MockERC20} from "../mocks/MockERC20.sol";
import {MockAToken} from "../mocks/MockAToken.sol";
import {MockAavePool} from "../mocks/MockAavePool.sol";
import {MockNovaToken} from "../mocks/MockNovaToken.sol";

contract GenesisPoolTest is Test {
    GenesisPool private pool;
    NogeController private controller;
    NogeToken private noge;
    MockERC20 private asset;
    MockAToken private aToken;
    MockAavePool private aavePool;
    MockNovaToken private nova;

    address private governance = makeAddr("governance");
    address private treasury = makeAddr("treasury");
    address private depositor = makeAddr("depositor");

    uint256 private constant DEPOSIT_CAP = 10_000_000e6;
    bytes32 private constant HASH_ONE = keccak256("CHUNK_ONE");
    bytes32 private constant HASH_TWO = keccak256("CHUNK_TWO");

    function setUp() public {
        asset = new MockERC20("Mock USD Coin", "mUSDC", 6);
        aToken = new MockAToken("Mock aUSDC", "maUSDC");
        aavePool = new MockAavePool(address(asset), address(aToken));
        aToken.setPool(address(aavePool));

        noge = new NogeToken(governance);
        controller = new NogeController(governance, address(noge), 100e18, 0);
        vm.startPrank(governance);
        noge.grantRole(noge.POOL_ROLE(), address(controller));
        vm.stopPrank();

        pool = new GenesisPool(
            address(asset), address(aToken), address(aavePool), treasury, governance, address(controller)
        );

        vm.prank(governance);
        pool.setDepositCap(DEPOSIT_CAP);

        vm.startPrank(governance);
        controller.grantRole(controller.POOL_ROLE(), address(pool));
        vm.stopPrank();

        asset.mint(depositor, 1_000_000e6);
        vm.prank(depositor);
        asset.approve(address(pool), type(uint256).max);

        asset.mint(address(aavePool), 1);

        nova = new MockNovaToken();
    }

    function _deposit(uint256 amount) private {
        vm.prank(depositor);
        pool.deposit(amount);
    }

    function testDepositUpdatesAccountingAndMintsNoge() public {
        uint256 amount = 1_000e6;
        uint256 expectedMint = controller.previewMint(amount, pool.ASSET_DECIMALS());

        _deposit(amount);

        assertEq(pool.principalBaseline(), amount, "baseline");
        assertEq(pool.getUserPrincipal(depositor), amount, "principal");
        assertEq(asset.balanceOf(address(aavePool)), amount + 1, "aave balance");
        assertEq(aToken.balanceOf(address(pool)), amount, "aToken balance");
        assertEq(noge.balanceOf(depositor), expectedMint, "noge minted");
    }

    function testSweepYieldSendsToTreasuryAndKeepsBuffer() public {
        uint256 amount = 5_000e6;
        _deposit(amount);

        vm.prank(governance);
        vm.expectRevert(GenesisPool.NoSweepableYield.selector);
        pool.sweepYield();

        uint256 yieldAmount = 500e6;
        aavePool.accrueYield(address(pool), yieldAmount);

        vm.prank(governance);
        pool.sweepYield();

        assertEq(asset.balanceOf(treasury), yieldAmount - pool.DUST_BUFFER(), "yield to treasury");
        assertEq(aToken.balanceOf(address(pool)), pool.principalBaseline() + pool.DUST_BUFFER(), "dust buffer retained");
    }

    function testHandoffCanBeDoneInChunks() public {
        uint256 total = 2_000e6;
        _deposit(total);

        vm.prank(governance);
        uint256 firstChunk = 500e6;
        pool.handoffPrincipal(treasury, firstChunk, HASH_ONE);

        assertTrue(pool.paused(), "paused after start");
        assertFalse(pool.principalHandedOff(), "still outstanding");
        assertEq(pool.handoffRemaining(), total - firstChunk, "remaining principal");

        vm.prank(governance);
        pool.handoffPrincipal(treasury, type(uint256).max, HASH_TWO);

        assertTrue(pool.principalHandedOff(), "handoff complete");
        assertEq(pool.handoffRemaining(), 0, "nothing remaining");
    }

    function testClaimNovaAfterHandoff() public {
        uint256 amount = 3_000e6;
        _deposit(amount);

        vm.startPrank(governance);
        // Single-call drain using Aave's max semantics; completion is detected via DUST_BUFFER
        pool.handoffPrincipal(treasury, type(uint256).max, HASH_ONE);
        pool.setNovaToken(address(nova));
        vm.stopPrank();

        vm.prank(depositor);
        pool.claimNova(depositor);

        assertEq(nova.minted(depositor), amount, "minted nova matches principal");
        assertEq(pool.getUserPrincipal(depositor), 0, "principal zeroed");
        assertEq(pool.principalBaseline(), 0, "baseline updated");

        vm.prank(depositor);
        vm.expectRevert(GenesisPool.NothingToClaim.selector);
        pool.claimNova(depositor);
    }

    function testDepositsBlockedOncePaused() public {
        _deposit(1_000e6);

        vm.prank(governance);
        pool.handoffPrincipal(treasury, 100e6, HASH_ONE);

        vm.prank(depositor);
        vm.expectRevert(Pausable.EnforcedPause.selector);
        pool.deposit(1);
    }

    function testDepositCapEnforcementAndNoShrinkBelowBaseline() public {
        vm.startPrank(governance);
        pool.setDepositCap(2_000e6);
        vm.stopPrank();

        _deposit(1_500e6);

        vm.prank(depositor);
        vm.expectRevert(GenesisPool.CapExceeded.selector);
        pool.deposit(600e6);

        vm.prank(governance);
        vm.expectRevert(GenesisPool.DepositCapTooLow.selector);
        pool.setDepositCap(1_000e6);
    }

    function testGetSweepableYieldRespectsDustBuffer() public {
        _deposit(1_000e6);

        uint256 buffer = pool.DUST_BUFFER();

        aavePool.accrueYield(address(pool), buffer - 1);
        assertEq(pool.getSweepableYield(), 0, "below buffer");

        aavePool.accrueYield(address(pool), 25);
        uint256 expectedSweepable = buffer - 1 + 25 - buffer;
        assertEq(pool.getSweepableYield(), expectedSweepable, "over buffer delta");

        vm.prank(governance);
        pool.sweepYield();
        assertEq(asset.balanceOf(treasury), expectedSweepable, "treasury receives sweep");
    }

    function testSweepYieldRevertsAfterPrincipalCompleteHandoff() public {
        uint256 amount = 2_000e6;
        _deposit(amount);

        vm.startPrank(governance);
        // After complete handoff, sweeping yield should revert
        pool.handoffPrincipal(treasury, type(uint256).max, HASH_ONE);
        vm.expectRevert(GenesisPool.PrincipalAlreadyHandedOff.selector);
        pool.sweepYield();
        vm.stopPrank();
    }

    function testUnpauseOnlyBeforeHandoffStarts() public {
        _deposit(1_000e6);

        vm.prank(governance);
        pool.pause();

        vm.prank(governance);
        pool.unpause();

        vm.prank(governance);
        pool.handoffPrincipal(treasury, 100e6, HASH_ONE);

        vm.prank(governance);
        vm.expectRevert(GenesisPool.PrincipalAlreadyHandedOff.selector);
        pool.unpause();
    }

    function testGetSweepableYieldZeroAfterHandoff() public {
        _deposit(1_000e6);

        vm.startPrank(governance);
        pool.handoffPrincipal(treasury, 900e6, HASH_ONE);
        pool.handoffPrincipal(treasury, type(uint256).max, HASH_TWO);
        vm.stopPrank();

        assertEq(pool.getSweepableYield(), 0, "no sweepable once handed off");
    }
}
