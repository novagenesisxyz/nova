// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/NogeToken.sol";
import "@openzeppelin/contracts/access/IAccessControl.sol";

contract NogeTokenTest is Test {
    NogeToken public noge;
    address public admin = address(this);
    address public pool = address(0xBEEF);
    address public user1 = address(0x1);
    address public user2 = address(0x2);

    bytes32 public constant POOL_ROLE = keccak256("POOL_ROLE");

    function setUp() public {
        noge = new NogeToken(admin);
    }

    function testMetadata() public {
        assertEq(noge.name(), "NOVA Genesis");
        assertEq(noge.symbol(), "NOGE");
        assertEq(noge.decimals(), 18);
    }

    function testRolesSetupAndGrant() public {
        // admin should have default admin role
        assertTrue(noge.hasRole(noge.DEFAULT_ADMIN_ROLE(), admin));

        // grant POOL_ROLE to pool
        noge.grantRole(POOL_ROLE, pool);
        assertTrue(noge.hasRole(POOL_ROLE, pool));
    }

    function testOnlyPoolCanMintAndBurn() public {
        uint256 amount = 1_000 ether;

        // Non-pool cannot mint
        vm.expectRevert();
        noge.mint(user1, amount);

        // Grant POOL_ROLE and mint
        noge.grantRole(POOL_ROLE, pool);
        vm.prank(pool);
        noge.mint(user1, amount);
        assertEq(noge.balanceOf(user1), amount);
        assertEq(noge.totalSupply(), amount);

        // Non-pool cannot burn
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
        noge.grantRole(POOL_ROLE, address(this));
        noge.mint(admin, 2_000 ether);

        // Transfer
        noge.transfer(user1, 500 ether);
        assertEq(noge.balanceOf(user1), 500 ether);
        assertEq(noge.balanceOf(admin), 1_500 ether);

        // Approve and transferFrom
        vm.prank(user1);
        noge.approve(user2, 500 ether);
        vm.prank(user2);
        noge.transferFrom(user1, user2, 500 ether);
        assertEq(noge.balanceOf(user1), 0);
        assertEq(noge.balanceOf(user2), 500 ether);
    }

    function testSupportsInterfaceForAccessControl() public {
        assertTrue(noge.supportsInterface(type(IAccessControl).interfaceId));
    }
}