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
# Edit .env.foundry with your keys
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
# Deploy to Sepolia
make deploy-sepolia
```

### Mainnet

```bash
# Deploy to mainnet (use with caution!)
make deploy-mainnet
```

## Contract Addresses

After deployment, add these addresses to your `.env` file:

```
NEXT_PUBLIC_NOGE_TOKEN_ADDRESS=0x...
NEXT_PUBLIC_FUNDING_POOL_ADDRESS=0x...
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