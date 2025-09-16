# Nova Smart Contracts

Smart contracts for the Nova funding platform, featuring NOGE memecoin as the deposit receipt token.

## Overview

The Nova platform consists of two main contracts:
- **NogeToken.sol**: ERC20 memecoin that serves as deposit receipts and governance tokens
- **NovaFundingPoolBase.sol**: Base for single-asset pools that earn yield through Aave
- **USDCFundingPool.sol / DAIFundingPool.sol / USDTFundingPool.sol**: Single-asset pools

## Features

- ✅ Accept USDC/DAI/USDT deposits
- ✅ Issue NOGE memecoins 1:1 with USD value
- ✅ Automatic yield generation through Aave V3
- ✅ Instant withdrawals using NOGE tokens
- ✅ Community governance voting system
- ✅ 51% quorum for fund allocation proposals
- ✅ Non-custodial design

## Setup

### Prerequisites

```bash
# Install Foundry via Homebrew
brew install foundry

# Clone the repository
git clone <repo-url>
cd nova

# Install dependencies
forge install

# Copy environment variables
cp .env.foundry.example .env.foundry
# Edit .env.foundry with your RPC URL, private key, and optional overrides.
```

### Build

```bash
# Build contracts
make build

# Or directly with forge
forge build
```

### Test

```bash
# Run tests
make test

# Run tests with gas reporting
make test-gas

# Run tests with coverage
make test-coverage
```

## Deployment

### Local Development

```bash
# Start local Anvil node with mainnet fork
make anvil

# In another terminal, deploy to local
make deploy-local
```

### Testnet (Sepolia)

```bash
# Deploy to Sepolia (uses .env.foundry)
make deploy-sepolia
```

> 💡 If `USDC_ADDRESS` is not provided in `.env.foundry`, the deploy script will
> automatically deploy a `MockUSDC` token (6 decimals) and mint 1,000,000 tokens
> to the deployer wallet for testing. By default the script uses the official
> Aave v3 Pool Addresses Provider via the
> [Aave address book](https://github.com/bgd-labs/aave-address-book)
> dependency (0xA97684ead0E402dC232d5A977953DF7ECBaB3CDb on mainnet,
> 0x012bAC54348C0E635dCAc9D5FB99f06F24136C9A on Sepolia). Set
> `AAVE_ADDRESSES_PROVIDER` in `.env.foundry` only if you need to override this
> behavior.

### Mainnet

```bash
# Deploy to mainnet (use with caution!)
make deploy-mainnet
```

## Contract Addresses

After deployment, add these addresses to your `.env.local` file for the frontend:

```
NEXT_PUBLIC_NOGE_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_FUNDING_POOL_USDC_ADDRESS=0x...
NEXT_PUBLIC_USDC_ADDRESS=0x...
NEXT_PUBLIC_GENESIS_GOAL_USDC=5000000
```

## Key Functions

### NovaFunding Pools (Single-Asset)

- NOGE receipts are minted on deposit and burned on withdrawal.
- `NogeToken` uses AccessControl; pools must be granted `POOL_ROLE` to mint/burn.
- Pools track only aggregate principal (`totalDeposits`) to compute yield; user balances are represented by NOGE.
- Admin can `pause`/`unpause` pools. Owner may withdraw only accrued yield via `withdrawYield`.

- `deposit(token, amount)`: Deposit stablecoins and receive NOGE
- `withdraw(token, amount)`: Withdraw using NOGE tokens
- `createProposal(token, amount, recipient)`: Create funding proposal (owner only)
- `
