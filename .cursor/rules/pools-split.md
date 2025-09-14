Three funding pools (single-asset each)

- Contracts: `USDCFundingPool`, `DAIFundingPool`, `USDTFundingPool` (all extend `NovaFundingPoolBase`).
- Env vars expected by frontend:
  - `NEXT_PUBLIC_FUNDING_POOL_USDC_ADDRESS`
  - `NEXT_PUBLIC_FUNDING_POOL_DAI_ADDRESS`
  - `NEXT_PUBLIC_FUNDING_POOL_USDT_ADDRESS`
- ABI used by frontend is the single-asset pool ABI (no token address in method args).
- Frontend selects pool address based on user’s token choice.

