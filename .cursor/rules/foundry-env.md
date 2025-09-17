Project environment loading for Foundry/Make

- Put RPC/API keys in `.env` or `.env.foundry` at the repo root.
- `Makefile` includes both files and exports all variables to child processes via `.EXPORT_ALL_VARIABLES`, so `forge`, `anvil`, etc. receive them.
- `foundry.toml` uses `[rpc_endpoints]` with environment variables like `ETH_RPC_URL` and `SEPOLIA_RPC_URL`.
- Example `.env` entries:
  - `SEPOLIA_RPC_URL=https://sepolia.infura.io/v3/<projectId>`
  - `ETH_RPC_URL=https://mainnet.infura.io/v3/<projectId>`
  - `ETHERSCAN_API_KEY=...`
- After setting the variables, commands like `make deploy-sepolia` will work without additional exports.
