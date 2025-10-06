// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {Test} from "forge-std/Test.sol";
import {NogeToken} from "../src/genesis/token/NogeToken.sol";
import {IAccessControl} from "@openzeppelin/contracts/access/IAccessControl.sol";

contract NogeTokenTest is Test {
    NogeToken public noge;
    address public admin = address(this);
    address public pool = address(0xBEEF);
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    function setUp() public {
        noge = new NogeToken(admin);
        noge.grantRole(noge.POOL_ROLE(), pool);
    }

    function testMetadata() public view {
        assertEq(noge.name(), "NOVA Genesis");
        assertEq(noge.symbol(), "NOGE");
        assertEq(noge.decimals(), 18);
    }

    function testAdminCanManagePoolRole() public {
        address newPool = address(0xCAFE);

        // owner adds a new pool
        noge.grantRole(noge.POOL_ROLE(), newPool);
        assertTrue(noge.hasRole(noge.POOL_ROLE(), newPool));

        // owner removes the pool
        noge.revokeRole(noge.POOL_ROLE(), newPool);
        assertFalse(noge.hasRole(noge.POOL_ROLE(), newPool));

        // non-owner cannot change pools
        bytes32 poolRole = noge.POOL_ROLE();
        vm.startPrank(user1);
        vm.expectRevert(
            abi.encodeWithSelector(IAccessControl.AccessControlUnauthorizedAccount.selector, user1, bytes32(0))
        );
        noge.grantRole(poolRole, newPool);
        vm.stopPrank();
    }

    function testOnlyPoolCanMintAndBurn() public {
        uint256 amount = 1_000 ether;

        // Non-pool cannot mint
        vm.prank(user1);
        vm.expectRevert();
        noge.mint(user1, amount);

        // Authorized pool mints
        vm.prank(pool);
        noge.mint(user1, amount);
        assertEq(noge.balanceOf(user1), amount);
        assertEq(noge.totalSupply(), amount);

        // Non-pool cannot burn
        vm.prank(user1);
        vm.expectRevert();
        noge.burn(user1, amount);

        // Pool can burn from user without allowance
        vm.prank(pool);
        noge.burn(user1, amount);
        assertEq(noge.balanceOf(user1), 0);
        assertEq(noge.totalSupply(), 0);
    }

    function testTransfersWorkWithMintedBalance() public {
        // Allow this test to act as pool for minting
        noge.grantRole(noge.POOL_ROLE(), address(this));
        noge.mint(admin, 2_000 ether);

        // Enable transfers immediately
        noge.enableTransfers();

        // Transfer
        bool transferOk = noge.transfer(user1, 500 ether);
        assertTrue(transferOk);
        assertEq(noge.balanceOf(user1), 500 ether);
        assertEq(noge.balanceOf(admin), 1_500 ether);

        // Approve and transferFrom
        vm.prank(user1);
        noge.approve(user2, 500 ether);
        vm.prank(user2);
        bool transferFromOk = noge.transferFrom(user1, user2, 500 ether);
        assertTrue(transferFromOk);
        assertEq(noge.balanceOf(user1), 0);
        assertEq(noge.balanceOf(user2), 500 ether);
    }

    function testTransfersRestrictedBeforeEnableTime() public {
        uint256 amount = 1_000 ether;
        // Mint to user1 via authorized pool
        vm.prank(pool);
        noge.mint(user1, amount);

        // user1 -> user2 should revert while restrictions are active
        vm.prank(user1);
        try noge.transfer(user2, 1 ether) returns (bool) {
            fail("transfer should revert");
        } catch (bytes memory data) {
            assertEq(bytes4(data), NogeToken.TransferRestricted.selector);
        }
    }

    function testAdminCanEnableTransfers() public {
        noge.enableTransfers();
        assertTrue(noge.transfersEnabled());
    }

    function testTransfersRevertBeforeEnableAndSucceedAfter() public {
        uint256 amount = 10 ether;
        // Mint to user1 via authorized pool
        vm.prank(pool);
        noge.mint(user1, amount);

        // Transfers still restricted before enabling
        vm.prank(user1);
        try noge.transfer(user2, 1 ether) returns (bool) {
            fail("transfer should revert");
        } catch (bytes memory data) {
            assertEq(bytes4(data), NogeToken.TransferRestricted.selector);
        }

        // Enable transfers and succeed
        noge.enableTransfers();
        vm.prank(user1);
        bool transferOkAfterEnable = noge.transfer(user2, 1 ether);
        assertTrue(transferOkAfterEnable);
        assertEq(noge.balanceOf(user1), amount - 1 ether);
        assertEq(noge.balanceOf(user2), 1 ether);
    }
}
