# Load environment from .env files if present
-include .env.foundry

# Export all Make variables to child processes (forge, anvil, etc.)
.EXPORT_ALL_VARIABLES:
.PHONY: install build test deploy deploy-sepolia verify clean

# Install dependencies
install:
	forge install

# Build contracts
build:
	forge build

# Run tests
test:
	forge test -vvv

# Run tests with gas reporting
test-gas:
	forge test --gas-report

# Run tests with coverage
test-coverage:
	forge coverage

# Deploy to local network
deploy-local:
	forge script script/Deploy.s.sol:DeployScript --rpc-url localhost --broadcast

# Deploy to Sepolia testnet
deploy-sepolia:
	forge script script/Deploy.s.sol:DeployScript --rpc-url sepolia --broadcast --verify

# Deploy to mainnet (use with caution!)
deploy-mainnet:
	@echo "⚠️  WARNING: About to deploy to mainnet. Press Ctrl+C to cancel, or Enter to continue."
	@read confirm
	forge script script/Deploy.s.sol:DeployScript --rpc-url mainnet --broadcast --verify

# Verify contract on Etherscan
verify:
	@echo "Usage: make verify CONTRACT=<address> ARGS='<constructor args>'"
	forge verify-contract $(CONTRACT) src/NogeToken.sol:NogeToken --chain mainnet --constructor-args $(ARGS)

# Clean build artifacts
clean:
	forge clean
	rm -rf out cache

# Format Solidity files
format:
	forge fmt

# Check Solidity formatting
format-check:
	forge fmt --check

# Update dependencies
update:
	forge update

# Generate ABI files for frontend
abi:
	@mkdir -p abi
	@forge inspect NogeToken abi > abi/NogeToken.json
	@forge inspect USDCFundingPool abi > abi/USDCFundingPool.json
	@echo "✅ ABI files generated in abi/"

# Start local Anvil node
anvil:
	anvil --fork-url $(ETH_RPC_URL)

# Help
help:
	@echo "Available commands:"
	@echo "  make install         - Install dependencies"
	@echo "  make build          - Build contracts"
	@echo "  make test           - Run tests"
	@echo "  make test-gas       - Run tests with gas reporting"
	@echo "  make test-coverage  - Run tests with coverage"
	@echo "  make deploy-local   - Deploy to local network"
	@echo "  make deploy-sepolia - Deploy to Sepolia testnet"
	@echo "  make deploy-mainnet - Deploy to mainnet (use with caution!)"
	@echo "  make verify         - Verify contract on Etherscan"
	@echo "  make clean          - Clean build artifacts"
	@echo "  make format         - Format Solidity files"
	@echo "  make format-check   - Check Solidity formatting"
	@echo "  make update         - Update dependencies"
	@echo "  make abi            - Generate ABI files for frontend"
	@echo "  make anvil          - Start local Anvil node with mainnet fork"