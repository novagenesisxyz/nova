## Foundry

**Foundry is a blazing fast, portable and modular toolkit for Ethereum application development written in Rust.**

Foundry consists of:

- **Forge**: Ethereum testing framework (like Truffle, Hardhat and DappTools).
- **Cast**: Swiss army knife for interacting with EVM smart contracts, sending transactions and getting chain data.
- **Anvil**: Local Ethereum node, akin to Ganache, Hardhat Network.
- **Chisel**: Fast, utilitarian, and verbose solidity REPL.

## Documentation

https://book.getfoundry.sh/

## Usage

### Build

```shell
$ forge build
```

### Test

```shell
$ forge test
```

### Format

```shell
$ forge fmt
```

### Gas Snapshots

```shell
$ forge snapshot
```

### Anvil

```shell
$ anvil
```

### Deploy

```shell
$ forge script script/Counter.s.sol:CounterScript --rpc-url <your_rpc_url> --private-key <your_private_key>
```

### Cast

```shell
$ cast <subcommand>
```

### Help

```shell
$ forge --help
$ anvil --help
$ cast --help
```

## Frontend TODO

- Replace mock initiative and transparency data with live sources once NOVA treasury addresses are public.
- Wire the Projects view to the backend API and hide preview data when production records exist.
- Automate transparency ledger exports (CSV + on-chain links) from the reporting pipeline.

## Sepolia Quickstart

1. **Set up environment files**
   ```bash
   cp .env.example .env.local
   cp .env.foundry.example .env.foundry
   ```
   - Fill `.env.foundry` with `SEPOLIA_RPC_URL`, `PRIVATE_KEY`, and optionally `USDC_ADDRESS`.
   - The deploy script auto-selects the official Aave v3 Pool Addresses Provider using the [Aave address book](https://github.com/bgd-labs/aave-address-book) dependency (0xA97684e... for mainnet, 0x012bAC... for Sepolia). Override by setting `AAVE_ADDRESSES_PROVIDER` in `.env.foundry` if you are targeting a different network or test harness.
   - In `.env.local`, set `NEXT_PUBLIC_GENESIS_GOAL_USDC` to the target amount of USDC you plan to raise during Genesis.

2. **Deploy contracts to Sepolia**
   ```bash
   make deploy-sepolia
   ```
   - The script prints `NEXT_PUBLIC_*` addresses; copy them into `.env.local`.
   - If no USDC address is supplied, a `MockUSDC` token is deployed and pre-minted to the deployer wallet for testing.

3. **Run contract tests**
   ```bash
   npm run contracts:test
   ```

4. **Start the frontend**
   ```bash
   npm install
   npm run dev
   ```
   - Connect a wallet configured for Sepolia and use the deposit widget to send mock USDC into the Genesis pool.

5. **(Optional) Redeploy**
   - Use `npm run contracts:deploy:sepolia` for scripted redeploys once environment variables are set.
