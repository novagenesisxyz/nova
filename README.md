# Nova Funding Platform

Nova channels stablecoin yield into frontier science grants. Depositors supply USDC, receive NOGE receipt tokens, and allow the protocol to route earned interest into milestone-based research while keeping principal withdrawable on demand.

## Start Here

**What you can do right now**
- Deposit Sepolia USDC through the web app and immediately receive NOGE tokens 1:1.
- Track the Genesis campaign progress and upcoming research initiatives from the landing page.
- Withdraw whenever you like; only accrued yield can be redirected to research wallets.

### Quick Demo (local frontend + Sepolia contracts)
1. Install [pnpm](https://pnpm.io/installation) and Node.js 18+. Install a wallet such as MetaMask funded with Sepolia ETH and test USDC.
2. Clone the repo and start the frontend:
   ```bash
   git clone <repo-url>
   cd nova/frontend
   pnpm install
   cp .env.example .env.local
   pnpm dev
   ```
3. Fill in `.env.local` with Sepolia RPC + contract addresses. If you have not deployed yet, use the Sepolia deployment flow below to obtain addresses, then refresh the app.
4. Visit `http://localhost:3000`, connect your Sepolia wallet, and try a small deposit to mint NOGE.

### Want to simulate everything locally?
- Run `anvil` with a mainnet fork and deploy the contracts (see **For Developers** below). Update your `.env.local` with the printed addresses.
- Use the Deposit widget with the automatically minted mock USDC from the deploy script.

## How It Works
- **Smart contracts:** A single USDC vault (`USDCFundingPool`) supplies deposits to Aave V3 and mints NOGE receipt tokens. Yield can be skimmed by the owner for off-chain research grants via `withdrawYield`.
- **Receipt token:** `NogeToken` (ERC20 + AccessControl) lets authorized pools mint/burn receipts.
- **Compliance token:** `NovaToken` is an optional regulated stablecoin with pause, blacklist, KYC, and law-enforcement hooks.
- **Frontend:** Next.js 15 app that surfaces campaign content, deposit/withdraw flows, and real-time progress bars.

## For Developers

### Repository Layout
```
nova/
├── contracts/          # Foundry smart contracts, scripts, tests
│   ├── src/            # Solidity sources (NogeToken, USDCFundingPool, NovaToken, MockUSDC...)
│   ├── script/         # forge script Deploy.s.sol
│   ├── test/           # Foundry test suite
│   ├── Makefile        # Convenience targets (build, test, deploy)
│   └── foundry.toml    # Foundry configuration
├── frontend/           # Next.js 15 application (App Router)
│   ├── app/, components/, hooks/, providers/
│   ├── lib/            # Contract config, wagmi client, constants
│   ├── abi/            # Generated ABIs (created by scripts/generate-abi.sh)
│   └── package.json    # pnpm workspace for the web app
├── docs/DEPLOYMENT.md  # Vercel deployment guide
├── scripts/            # Shell helpers (deploy.sh, generate-abi.sh)
└── LICENSE             # MIT license
```

### Environment configuration
- `contracts/.env.foundry.example` provides placeholders for `SEPOLIA_RPC_URL`, `PRIVATE_KEY`, optional `USDC_ADDRESS`, and `AAVE_ADDRESSES_PROVIDER` overrides. Copy to `.env.foundry` and fill before running Foundry commands.
- `frontend/.env.example` lists all public environment variables expected by the web app: WalletConnect project ID, Sepolia RPC URL, contract addresses, and optional analytics IDs.

### Frontend commands (run inside `frontend/`)
```bash
pnpm dev       # start Next.js locally
pnpm build     # production build
pnpm start     # run build output
pnpm lint      # ESLint & TypeScript checks
```

### Smart contract workflow (run inside `contracts/`)
```bash
forge install                  # fetch dependencies defined in foundry.toml
forge build                    # compile contracts with solc 0.8.26
forge test                     # execute unit tests (see contracts/test/*.t.sol)
make anvil                     # start a forked local chain using ETH_RPC_URL
make deploy-local              # broadcast Deploy.s.sol to the local node
make deploy-sepolia            # deploy to Sepolia using .env.foundry credentials
make abi                       # regenerate ABIs (also run by scripts/generate-abi.sh)
```

The unified shell script `./scripts/deploy.sh <network>` wraps the deploy + ABI generation flow. Supported values today are `local`, `sepolia`, and `mainnet` (prompts before broadcasting to mainnet).

### Testing
- Foundry tests cover the USDC pool invariants, receipt token permissions, and address-book integration. Run them via `forge test` or `make test`.
- Add additional coverage with `forge test --gas-report` or `forge coverage` if you are optimizing gas or auditing changes.
- The frontend currently relies on component-level hooks; add Jest/Playwright tests before shipping major UI changes (not yet included).

### Deployment checklist
1. Populate `.env.foundry` with RPC URLs, `PRIVATE_KEY`, and optional overrides.
2. `make deploy-sepolia` (or `./scripts/deploy.sh sepolia`) to broadcast contracts. On success the script prints addresses for NOGE, NOVA, USDC pool, and the underlying USDC token (mock if none supplied).
3. Paste those addresses into `frontend/.env.local`, along with your WalletConnect project ID and RPC URL.
4. `pnpm build` in `frontend/` and deploy via Vercel or follow the detailed steps in `docs/DEPLOYMENT.md`.

## License

Nova Funding Platform is released under the [MIT License](LICENSE).
