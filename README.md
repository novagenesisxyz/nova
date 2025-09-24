# Nova Funding Platform

A decentralized funding platform built with Foundry smart contracts and Next.js frontend, featuring NOGE memecoin as the deposit receipt token.

## Project Structure

```
nova/
├── contracts/                 # Smart contracts (Foundry)
│   ├── src/                  # Contract source files
│   ├── test/                 # Contract tests
│   ├── script/               # Deployment scripts
│   ├── lib/                  # Dependencies (git submodules)
│   └── README.md             # Contract-specific documentation
│
├── frontend/                  # Next.js application
│   ├── app/                  # App router pages
│   ├── components/           # React components
│   ├── hooks/                # Custom React hooks
│   ├── providers/            # Context providers
│   ├── lib/                  # Utilities & constants
│   ├── public/               # Static assets
│   └── abi/                  # Generated contract ABIs
│
├── docs/                      # Documentation
│   └── DEPLOYMENT.md         # Deployment guide
│
└── scripts/                   # Automation scripts
    ├── deploy.sh             # Unified deployment
    └── generate-abi.sh       # ABI generation
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- Git

### Setup

1. **Clone and install dependencies:**
```bash
git clone <repo-url>
cd nova
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env.local
cp .env.foundry.example .env.foundry
```

3. **Configure .env.foundry:**
```env
SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
PRIVATE_KEY=your_private_key
# Optional: Set USDC_ADDRESS or a MockUSDC will be deployed
```

4. **Configure frontend/.env.local:**
```env
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=your_project_id
NEXT_PUBLIC_SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
NEXT_PUBLIC_GENESIS_GOAL_USDC=5000000
# Contract addresses will be added after deployment
```

## Development

### Smart Contracts

```bash
# Build contracts
npm run build:contracts

# Run tests
npm run test:contracts

# Start local node
npm run anvil

# Deploy to local
npm run deploy:local
```

### Frontend

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production server
npm run start
```

## Deployment

### Deploy to Sepolia

```bash
# Deploy contracts and generate ABIs
npm run deploy:sepolia

# Or use the script directly
./scripts/deploy.sh sepolia
```

After deployment:
1. Copy the deployed addresses from the output
2. Add them to `frontend/.env.local`:
   - `NEXT_PUBLIC_NOGE_TOKEN_ADDRESS`
   - `NEXT_PUBLIC_FUNDING_POOL_USDC_ADDRESS`
   - `NEXT_PUBLIC_USDC_ADDRESS`

### Deploy Frontend to Vercel

See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for detailed instructions.

## Key Features

- ✅ Accept USDC/DAI/USDT deposits
- ✅ Issue NOGE memecoins 1:1 with USD value
- ✅ Automatic yield generation through Aave V3
- ✅ Instant withdrawals using NOGE tokens
- ✅ Community governance voting system
- ✅ 51% quorum for fund allocation proposals
- ✅ Non-custodial design

## Contract Architecture

The platform consists of:
- **NogeToken.sol**: ERC20 memecoin serving as deposit receipts
- **NovaFundingPoolBase.sol**: Base contract for single-asset pools
- **USDCFundingPool.sol**: USDC-specific pool implementation
- **NovaToken.sol**: Governance token for the platform

## Frontend Architecture

Built with:
- Next.js 15 with App Router
- RainbowKit for wallet connections
- Wagmi for blockchain interactions
- TailwindCSS for styling
- Recharts for data visualization

## Testing

```bash
# Run all contract tests
cd contracts && forge test

# Run with gas reporting
cd contracts && forge test --gas-report

# Run with coverage
cd contracts && forge coverage
```

## Scripts

- `generate-abi.sh`: Extracts contract ABIs for frontend use
- `deploy.sh`: Unified deployment script with network selection

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

ISC