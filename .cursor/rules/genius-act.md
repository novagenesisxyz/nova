Genius Act stablecoin implementation notes

- Roles: `DEFAULT_ADMIN_ROLE`, `PAUSER_ROLE`, `MINTER_ROLE`, `COMPLIANCE_ROLE`, `LAW_ENFORCEMENT_ROLE`.
- Controls: global pause; blacklist; per-account freeze; optional KYC gating toggled by compliance role.
- Law enforcement: `forceTransfer(from,to,amount,reference)`, `seizeAndWipe(from,amount,reference)` with bypass of checks limited to the operation and events emitted.
- Permit: EIP-2612 via OpenZeppelin `ERC20Permit`.
- Redemption: `redeem(amount)` burn with event; off-chain par redemption operational requirement.
- Transparency/ops: off-chain monthly attestations, reserve reporting and segregation not handled on-chain.
- Marketing restrictions and interest prohibition: enforce operationally; token contract does not pay yield.

Add off-chain processes: reserve attestations, audits, AML/KYC program, par-value redemption policy.
