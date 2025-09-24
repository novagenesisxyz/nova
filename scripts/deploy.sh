#!/bin/bash

# Unified deployment script
set -e

NETWORK=${1:-sepolia}

echo "🚀 Deploying to $NETWORK..."

# Load environment variables
if [ -f .env.foundry ]; then
    export $(cat .env.foundry | grep -v '^#' | xargs)
fi

# Navigate to contracts directory
cd contracts

# Run deployment
echo "📜 Running deployment script..."
if [ "$NETWORK" = "local" ]; then
    forge script script/Deploy.s.sol:DeployScript --rpc-url localhost --broadcast
elif [ "$NETWORK" = "sepolia" ]; then
    forge script script/Deploy.s.sol:DeployScript --rpc-url sepolia --broadcast --verify
elif [ "$NETWORK" = "mainnet" ]; then
    echo "⚠️  WARNING: About to deploy to mainnet. Press Enter to continue or Ctrl+C to cancel."
    read confirm
    forge script script/Deploy.s.sol:DeployScript --rpc-url mainnet --broadcast --verify
else
    echo "❌ Unknown network: $NETWORK"
    exit 1
fi

# Generate ABIs after deployment
echo "📄 Generating ABIs..."
cd ..
./scripts/generate-abi.sh

echo "✅ Deployment complete!"
echo ""
echo "Next steps:"
echo "1. Copy the deployed addresses to your frontend/.env.local file"
echo "2. Run 'npm run dev' to start the frontend"