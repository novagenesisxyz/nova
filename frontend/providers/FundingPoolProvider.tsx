"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAccount, usePublicClient } from "wagmi";
import type { Address } from "viem";
import { CONTRACTS, APP_CHAIN_ID, FUNDING_POOL_ABI, ERC20_ABI } from "@/lib/contracts";

export type FundingPoolStatus = "idle" | "loading" | "ready" | "error";

type Snapshot = {
  totalDeposits: bigint;
  usdcBalance: bigint;
  nogeBalance: bigint;
};

type FundingPoolContextValue = {
  status: FundingPoolStatus;
  error: Error | null;
  totalDeposits: bigint | null;
  usdcBalance: bigint | null;
  nogeBalance: bigint | null;
  isConfigured: boolean;
  addresses: {
    pool: Address | null;
    usdc: Address | null;
    noge: Address | null;
  };
  walletAddress: Address | undefined;
  refetch: () => Promise<void>;
};

const FundingPoolContext = createContext<FundingPoolContextValue | undefined>(undefined);

const INITIAL_SNAPSHOT: Snapshot = {
  totalDeposits: 0n,
  usdcBalance: 0n,
  nogeBalance: 0n,
};

const REFRESH_INTERVAL_MS = 15_000;

export function FundingPoolProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { address: walletAddress } = useAccount();
  const client = usePublicClient({ chainId: APP_CHAIN_ID });

  const poolAddress = CONTRACTS.FUNDING_POOL ?? null;
  const usdcAddress = CONTRACTS.USDC ?? null;
  const nogeAddress = CONTRACTS.NOGE_TOKEN ?? null;

  const isConfigured = Boolean(poolAddress && usdcAddress && nogeAddress);

  const [status, setStatus] = useState<FundingPoolStatus>("idle");
  const [snapshot, setSnapshot] = useState<Snapshot>(INITIAL_SNAPSHOT);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const refetch = useCallback(async () => {
    if (!mounted || !isConfigured || !poolAddress || !usdcAddress || !nogeAddress) {
      setStatus("idle");
      return;
    }

    if (!client) {
      return;
    }

    setStatus((prev) => (prev === "ready" ? prev : "loading"));

    try {
      const [totalDeposits, usdcBalance, nogeBalance] = await Promise.all([
        client
          .readContract({
            address: poolAddress,
            abi: FUNDING_POOL_ABI,
            functionName: "totalDeposits",
          })
          .then((value) => value as bigint),
        walletAddress
          ? client
              .readContract({
                address: usdcAddress,
                abi: ERC20_ABI,
                functionName: "balanceOf",
                args: [walletAddress],
              })
              .then((value) => value as bigint)
          : Promise.resolve<bigint>(0n),
        walletAddress
          ? client
              .readContract({
                address: nogeAddress,
                abi: ERC20_ABI,
                functionName: "balanceOf",
                args: [walletAddress],
              })
              .then((value) => value as bigint)
          : Promise.resolve<bigint>(0n),
      ]);

      setSnapshot({ totalDeposits, usdcBalance, nogeBalance });
      setError(null);
      setStatus("ready");
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("FundingPool refetch failed", error);
      setError(error);
      setStatus("error");
    }
  }, [mounted, client, isConfigured, poolAddress, usdcAddress, nogeAddress, walletAddress]);

  useEffect(() => {
    if (!mounted || !isConfigured) {
      setStatus("idle");
      setSnapshot(INITIAL_SNAPSHOT);
      setError(null);
      return;
    }

    void refetch();

    const interval = setInterval(() => {
      void refetch();
    }, REFRESH_INTERVAL_MS);

    return () => {
      clearInterval(interval);
    };
  }, [mounted, isConfigured, refetch]);

  const value = useMemo<FundingPoolContextValue>(
    () => ({
      status,
      error,
      totalDeposits: status === "ready" ? snapshot.totalDeposits : null,
      usdcBalance:
        status === "ready" || status === "loading" ? snapshot.usdcBalance : null,
      nogeBalance:
        status === "ready" || status === "loading" ? snapshot.nogeBalance : null,
      isConfigured,
      addresses: {
        pool: poolAddress,
        usdc: usdcAddress,
        noge: nogeAddress,
      },
      walletAddress,
      refetch,
    }),
    [status, error, snapshot, isConfigured, poolAddress, usdcAddress, nogeAddress, walletAddress, refetch],
  );

  return <FundingPoolContext.Provider value={value}>{children}</FundingPoolContext.Provider>;
}

export function useFundingPoolContext() {
  const context = useContext(FundingPoolContext);
  if (!context) {
    throw new Error("useFundingPoolContext must be used within FundingPoolProvider");
  }
  return context;
}
