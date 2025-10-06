# Nova Smart Contracts

This package contains the on-chain contracts that power the Nova Genesis funding phase. The codebase is intentionally minimal:

- **GenesisPool.sol** — locks a single stablecoin, supplies it to Aave, tracks immutable principal for NOVA claims, and lets governance hand off principal in staged chunks.
- **NogeController.sol** — flat-ratio NOGE issuance with optional global supply cap and pool allow-listing.
- **NogeToken.sol** — advisory ERC20 token with a one-way transfer enable switch; minting/burning gated by the controller.

Supporting mocks are provided for local deployments (`MockERC20`, `MockAToken`, `MockAavePool`).

## Features

- Single-asset Genesis pool per stable (no price feeds, no proxies).
- Principal is non-refundable until launch; sweepable yield can be routed to the research treasury.
- Governance-controlled, chunked handoff of principal with automatic pausing on first withdrawal.
- Immutable per-wallet principal ledger to back NOVA claims.
- Flat NOGE mint ratio with optional global cap and AccessControl roles.

## Setup

```bash
# Install Foundry
brew install foundry

# Clone and enter the repo
git clone <repo-url>
cd nova/contracts

# Install dependencies
forge install

# Copy environment template (set RPC, PRIVATE_KEY, etc.)
cp env.foundry.example .env.foundry
```

## Build & Test

```bash
make build   # forge build
make test    # forge test
```

Additional targets:

- `make test-gas`
- `make test-coverage`
- `make format` / `make format-check`
- `make abi` — exports Genesis/NOGE ABIs to `contracts/abi/`

## Deployment

The deployment script lives at `script/DeployGenesis.s.sol`. It can deploy against mainnet-compatible networks or fall back to mocks when asset addresses are omitted.

Required environment variables (set in `.env.foundry`):

- `PRIVATE_KEY` — deployer key.
- `TREASURY_ADDRESS` — research treasury multisig.

Optional overrides:

- `GOVERNANCE_ADDRESS` — defaults to deployer.
- `ASSET_ADDRESS`, `ATOKEN_ADDRESS`, `LENDING_POOL_ADDRESS` — real stablecoin/aToken/Aave pool. If any is omitted, mocks are deployed.
- `DEPOSIT_CAP` — per-pool cap in asset units (0 = uncapped).
- `NOGE_RATIO` — flat mint ratio (defaults to `100e18`).
- `NOGE_GLOBAL_CAP` — optional global NOGE max (0 = uncapped).

### Commands

```bash
make deploy-local    # uses mocks when asset addresses are unset
make deploy-sepolia  # broadcast + verify to Sepolia
make deploy-mainnet  # prompts before broadcasting to mainnet
```

After deployment, copy the logged addresses into the frontend `.env`:

```
NEXT_PUBLIC_GENESIS_POOL_ADDRESS=0x...
NEXT_PUBLIC_NOGE_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_ASSET_ADDRESS=0x...
NEXT_PUBLIC_TREASURY_ADDRESS=0x...
NEXT_PUBLIC_CHAIN_ID=11155111
```

## ABIs

Generate JSON ABIs for the frontend:

```bash
pnpm --filter ../frontend install    # ensure frontend deps (optional)
../scripts/generate-abi.sh          # from repo root
```

This writes `GenesisPool.json`, `NogeController.json`, `NogeToken.json`, and mock ABIs to `frontend/abi/`.

## Notes

- `GenesisPool` pauses itself on the first `handoffPrincipal` call and completes once the remaining balance is fully withdrawn (respecting the built-in dust buffer).
- Yield sweeps are gated to governance and only possible before the handoff completes.
- NOVA claim flow requires governance to set `novaToken` once the off-chain launch is finalized.
