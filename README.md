# Nova - DeFi Research Funding Platform

A decentralized research funding platform powered by stablecoins and quadratic funding. Nova enables users to stake stablecoins to vote on research projects, with all platform yields flowing directly to scientists. NOVA is a stablecoin that supports the ecosystem.

## Features

- **Quadratic Funding**: Democratic funding mechanism that amplifies the impact of smaller contributors
- **Multi-Token Support**: Stake USDC, DAI, USDT, and other high-quality stablecoins
- **NOVA Stablecoin**: Platform stablecoin redeemable 1:1, with purchase fees supporting research
- **Real-Time Stats**: Live funding updates and progress tracking
- **Research Categories**: Browse projects across climate science, medical research, quantum computing, and more
- **Wallet Integration**: Connect with popular DeFi wallets via RainbowKit

## Tech Stack

- **Framework**: Next.js 15 with TypeScript
- **Styling**: Tailwind CSS with custom dark theme
- **Web3**: Wagmi, Viem, RainbowKit for wallet connections
- **Animations**: Framer Motion
- **Charts**: Recharts for data visualization
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Project Structure

```
nova/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── projects/          # Project listing page
│   ├── project/[id]/      # Individual project pages
│   └── nova-token/        # NOVA token information
├── components/            # React components
│   ├── Navbar.tsx        # Navigation bar
│   ├── ProjectCard.tsx   # Project display cards
│   ├── StakingModal.tsx  # Staking interface
│   └── FundingChart.tsx  # Real-time funding charts
├── lib/                   # Utilities and types
│   ├── types.ts          # TypeScript type definitions
│   ├── constants.ts      # Platform constants
│   ├── mockData.ts       # Sample project data
│   └── wagmi.ts          # Web3 configuration
└── public/               # Static assets

```

## Key Features Explained

### Quadratic Funding
The platform implements quadratic funding to ensure smaller contributors have a meaningful voice in funding decisions. The quadratic score is calculated based on the square root of stake amounts, which determines how platform yields are distributed to projects.

### NOVA Stablecoin Economics
- **Backing**: 150% collateralized by stablecoins
- **Purpose**: Buy NOVA to support research funding
- **Stability**: Always redeemable 1:1 for underlying stablecoins
- **Impact**: Purchase fees and yield generation support research projects

### Staking Mechanism
1. Connect your wallet
2. Browse research projects
3. Select a project to support
4. Choose your stablecoin and amount
5. Stake to vote - your stake directs platform yields to the project

## Development

```bash
# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details