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
forge inspect src/genesis/token/NogeToken.sol:NogeToken abi > ../frontend/abi/NogeToken.json
forge inspect src/genesis/NogeController.sol:NogeController abi > ../frontend/abi/NogeController.json
forge inspect src/genesis/GenesisPool.sol:GenesisPool abi > ../frontend/abi/GenesisPool.json

# Done
echo "✅ ABIs generated successfully in frontend/abi/"
