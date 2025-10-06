# Nova Funding Platform

Nova channels stablecoin yield into frontier science grants. During Genesis, contributors deposit stablecoins, receive NOGE advisory tokens, and help build the reserve that will back NOVA at launch. Principal stays locked until the handoff completes and NOVA claims open.

## Start Here

**What you can do right now**
- Deposit USDC via the Genesis web app (reservations are non-refundable until launch).
- Receive NOGE (Nova Genesis) advisory tokens at a flat ratio, viewable directly in your wallet once transfers are enabled.
- Track Genesis progress, treasury handoff status, and upcoming research initiatives from the landing page.
- Review the launch flow documentation to understand how NOVA claims unlock once governance has handed off reserves.

### Quick Demo (local frontend + mock contracts)
1. Install [pnpm](https://pnpm.io/installation) and Node.js 18+. Ensure you have Foundry installed (`brew install foundry`).
2. Clone the repo and install dependencies:
   ```bash
   git clone <repo-url>
   cd nova
   pnpm --filter frontend install
   ```
3. Populate contract env vars and deploy mocks:
   ```bash
   cd contracts
   cp .env.foundry.example .env.foundry   # set PRIVATE_KEY, TREASURY_ADDRESS, RPC URL
   make deploy-local                       # uses mock USDC + mock Aave pool
   ```
4. Export the printed addresses into `frontend/.env.local`:
   ```
   NEXT_PUBLIC_GENESIS_POOL_ADDRESS=
   NEXT_PUBLIC_NOGE_TOKEN_ADDRESS=
   NEXT_PUBLIC_ASSET_ADDRESS=
   NEXT_PUBLIC_TREASURY_ADDRESS=
   NEXT_PUBLIC_CHAIN_ID=31337
   ```
5. Start the frontend:
   ```bash
   cd ../frontend
   pnpm dev
   ```
6. Visit `http://localhost:3000`, connect your wallet (Anvil default key works), and test deposits/claim previews using the mock USDC supplied during deployment.

## How It Works

- **GenesisPool** locks a single stablecoin, supplies it to Aave, tracks per-user principal for NOVA claims, forwards sweepable yield to the research treasury, and lets governance hand off principal in staged chunks.
- **NogeController** mints NOGE on deposit using a fixed ratio with an optional global supply cap and strict pool allow-listing.
- **NogeToken** is an ERC20 advisory token with transfers disabled until governance flips a one-way switch. Only pools granted `POOL_ROLE` can mint/burn.
- **Frontend** (Next.js 15) surfaces pool metrics, claim readiness, and context about the launch path.

## Repository Layout
```
nova/
├── contracts/          # Foundry smart contracts, scripts, tests
│   ├── src/genesis/    # GenesisPool, NogeController, NogeToken
│   ├── script/         # DeployGenesis.s.sol
│   ├── test/           # Foundry test suite + mocks
│   └── README.md       # Contract-specific docs
├── frontend/           # Next.js application
│   ├── app/, components/, hooks/, providers/
│   ├── lib/            # Contract config & helpers
│   └── abi/            # Generated ABIs (scripts/generate-abi.sh)
├── docs/               # Additional specs, deployment notes
├── scripts/            # Shell helpers (generate-abi.sh, etc.)
└── specs/              # Structured product requirements
```

## Environment Configuration
- `contracts/.env.foundry.example` — set `SEPOLIA_RPC_URL` (or other RPC), `PRIVATE_KEY`, `TREASURY_ADDRESS`, and optional overrides (`GOVERNANCE_ADDRESS`, `ASSET_ADDRESS`, etc.).
- `frontend/.env.example` — copy to `.env.local` and supply WalletConnect project ID, RPC URL, and the contract addresses printed by the deploy script.

## Frontend Commands (inside `frontend/`)
```bash
pnpm dev       # start Next.js locally
pnpm build     # production build
pnpm start     # run the build output
pnpm lint      # lint & type-check
pnpm test:e2e  # Playwright end-to-end smoke tests (run `pnpm exec playwright install` once)
```

## Smart Contract Workflow (inside `contracts/`)
```bash
forge install                  # dependencies
forge build                    # compile
forge test                     # run unit tests
make deploy-local              # broadcast DeployGenesis.s.sol to local node (mocks if needed)
make deploy-sepolia            # deploy to Sepolia (requires configured RPC + key)
make abi                       # regenerate ABIs consumed by the frontend
```

The helper `scripts/generate-abi.sh` (run from repo root) builds contracts and exports ABIs into `frontend/abi/`.

## Deployment Checklist
1. Populate `.env.foundry` with RPC URLs, `PRIVATE_KEY`, `TREASURY_ADDRESS`, and any Aave address overrides.
2. Run `make deploy-sepolia` (or `make deploy-mainnet`) from `contracts/`. The script deploys `NogeToken`, `NogeController`, and `GenesisPool`, wiring AccessControl roles automatically.
3. Copy the printed addresses into `frontend/.env.local` and set `NEXT_PUBLIC_CHAIN_ID` for the target network.
4. `pnpm build` in `frontend/` and deploy via Vercel (see `docs/DEPLOYMENT.md`) or your preferred host.
5. Announce the new Genesis pool address and verify treasury sweep/handoff permissions before accepting >1m USDC.

## Testing
- Foundry tests cover NOGE issuance, Genesis deposit/sweep flows, staged handoff, and NOVA claim logic.
- Property-based/invariant tests are suggested before mainnet launch (see `specs` for ideas).
- Frontend currently relies on manual QA; add integration tests before production launch.

## License

Nova Funding Platform is released under the [MIT License](LICENSE).
