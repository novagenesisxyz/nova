Solidity Error Conventions

- Use custom errors instead of string-based require/revert messages across all contracts.
- Prefer revert ErrorName(args) branches over require(condition, ...).
- Name errors clearly and colocate near the top of the contract.
- For receive/fallback, use explicit custom errors (e.g., EtherNotAccepted).
- Tests must assert error selectors via abi.encodeWithSelector, not strings.

Example

```solidity
error AmountZero();

function deposit(uint256 amount) external {
    if (amount == 0) revert AmountZero();
}

// Test
vm.expectRevert(abi.encodeWithSelector(AmountZero.selector));
deposit(0);
```


