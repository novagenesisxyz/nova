import { defineConfig, devices } from '@playwright/test';

const PORT = process.env.PLAYWRIGHT_PORT || '3100';

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  expect: {
    timeout: 5_000,
  },
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'on-first-retry',
    video: 'retain-on-failure',
  },
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    port: Number(PORT),
    reuseExistingServer: !process.env.CI,
    env: {
      NEXT_PUBLIC_GENESIS_POOL_ADDRESS: '0x0000000000000000000000000000000000000010',
      NEXT_PUBLIC_NOGE_TOKEN_ADDRESS: '0x0000000000000000000000000000000000000020',
      NEXT_PUBLIC_ASSET_ADDRESS: '0x0000000000000000000000000000000000000030',
      NEXT_PUBLIC_TREASURY_ADDRESS: '0x0000000000000000000000000000000000000040',
      NEXT_PUBLIC_CHAIN_ID: '31337',
      NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID: 'test-project',
      NEXT_PUBLIC_SEPOLIA_RPC_URL: 'https://sepolia.example.org',
    },
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
