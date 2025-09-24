'use client';

import * as React from 'react';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { config } from '@/lib/wagmi';
import '@rainbow-me/rainbowkit/styles.css';
import { FundingPoolProvider } from '@/providers/FundingPoolProvider';

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {mounted ? (
          <RainbowKitProvider theme={darkTheme({
            accentColor: '#7c3aed',
            accentColorForeground: 'white',
          })}>
            <FundingPoolProvider>{children}</FundingPoolProvider>
          </RainbowKitProvider>
        ) : (
          <FundingPoolProvider>{children}</FundingPoolProvider>
        )}
      </QueryClientProvider>
    </WagmiProvider>
  );
}
