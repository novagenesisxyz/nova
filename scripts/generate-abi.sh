#!/bin/bash

# Generate ABIs from compiled contracts for frontend use
echo "🔄 Generating contract ABIs..."

# Navigate to contracts directory
cd contracts

# Build contracts first
echo "📦 Building contracts..."
forge build

# Create ABI directory in frontend
mkdir -p ../frontend/abi

# Generate ABIs for main contracts
echo "📄 Extracting ABIs..."
forge inspect NogeToken abi > ../frontend/abi/NogeToken.json
forge inspect USDCFundingPool abi > ../frontend/abi/USDCFundingPool.json
forge inspect NovaFundingPoolBase abi > ../frontend/abi/NovaFundingPoolBase.json
forge inspect NovaToken abi > ../frontend/abi/NovaToken.json
forge inspect MockUSDC abi > ../frontend/abi/MockUSDC.json

echo "✅ ABIs generated successfully in frontend/abi/"