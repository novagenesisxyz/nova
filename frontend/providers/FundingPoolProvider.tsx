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
import { CONTRACTS, APP_CHAIN_ID, GENESIS_POOL_ABI, ERC20_ABI } from "@/lib/contracts";

export type FundingPoolStatus = "idle" | "loading" | "ready" | "error";

type Snapshot = {
  principalBaseline: bigint;
  sweepableYield: bigint;
  handoffRemaining: bigint;
  dustBuffer: bigint;
  handoffStarted: boolean;
  principalHandedOff: boolean;
  paused: boolean;
  novaToken: Address | null;
  assetBalance: bigint;
  nogeBalance: bigint;
  userPrincipal: bigint;
};

type FundingPoolContextValue = {
  status: FundingPoolStatus;
  error: Error | null;
  principalBaseline: bigint | null;
  sweepableYield: bigint | null;
  handoffRemaining: bigint | null;
  dustBuffer: bigint | null;
  handoffStarted: boolean | null;
  principalHandedOff: boolean | null;
  paused: boolean | null;
  novaToken: Address | null;
  assetBalance: bigint | null;
  nogeBalance: bigint | null;
  userPrincipal: bigint | null;
  isConfigured: boolean;
  addresses: {
    pool: Address | null;
    asset: Address | null;
    noge: Address | null;
    treasury: Address | null;
  };
  walletAddress: Address | undefined;
  refetch: () => Promise<void>;
};

const FundingPoolContext = createContext<FundingPoolContextValue | undefined>(undefined);

const INITIAL_SNAPSHOT: Snapshot = {
  principalBaseline: 0n,
  sweepableYield: 0n,
  handoffRemaining: 0n,
  dustBuffer: 0n,
  handoffStarted: false,
  principalHandedOff: false,
  paused: false,
  novaToken: null,
  assetBalance: 0n,
  nogeBalance: 0n,
  userPrincipal: 0n,
};

const REFRESH_INTERVAL_MS = 15_000;

export function FundingPoolProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { address: walletAddress } = useAccount();
  const client = usePublicClient({ chainId: APP_CHAIN_ID });

  const poolAddress = CONTRACTS.GENESIS_POOL ?? null;
  const assetAddress = CONTRACTS.ASSET ?? null;
  const nogeAddress = CONTRACTS.NOGE_TOKEN ?? null;
  const treasuryAddress = CONTRACTS.TREASURY ?? null;

  const isConfigured = Boolean(poolAddress && assetAddress && nogeAddress);

  const [status, setStatus] = useState<FundingPoolStatus>("idle");
  const [snapshot, setSnapshot] = useState<Snapshot>(INITIAL_SNAPSHOT);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const refetch = useCallback(async () => {
    if (!mounted || !isConfigured || !poolAddress || !assetAddress || !nogeAddress) {
      setStatus("idle");
      return;
    }

    if (!client) {
      return;
    }

    setStatus((prev) => (prev === "ready" ? prev : "loading"));

    try {
      const [principalBaseline, sweepableYield, handoffRemaining, handoffStarted, principalHandedOff, dustBuffer, paused, novaToken] =
        await Promise.all([
          client.readContract({
            address: poolAddress,
            abi: GENESIS_POOL_ABI,
            functionName: "principalBaseline",
          }) as Promise<bigint>,
          client.readContract({
            address: poolAddress,
            abi: GENESIS_POOL_ABI,
            functionName: "getSweepableYield",
          }) as Promise<bigint>,
          client.readContract({
            address: poolAddress,
            abi: GENESIS_POOL_ABI,
            functionName: "handoffRemaining",
          }) as Promise<bigint>,
          client.readContract({
            address: poolAddress,
            abi: GENESIS_POOL_ABI,
            functionName: "handoffStarted",
          }) as Promise<boolean>,
          client.readContract({
            address: poolAddress,
            abi: GENESIS_POOL_ABI,
            functionName: "principalHandedOff",
          }) as Promise<boolean>,
          client.readContract({
            address: poolAddress,
            abi: GENESIS_POOL_ABI,
            functionName: "DUST_BUFFER",
          }) as Promise<bigint>,
          client.readContract({
            address: poolAddress,
            abi: GENESIS_POOL_ABI,
            functionName: "paused",
          }) as Promise<boolean>,
          client.readContract({
            address: poolAddress,
            abi: GENESIS_POOL_ABI,
            functionName: "novaToken",
          }) as Promise<Address>,
        ]);

      const [assetBalance, nogeBalance, userPrincipal] = await Promise.all([
        walletAddress
          ? client
              .readContract({
                address: assetAddress,
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
        walletAddress
          ? client
              .readContract({
                address: poolAddress,
                abi: GENESIS_POOL_ABI,
                functionName: "getUserPrincipal",
                args: [walletAddress],
              })
              .then((value) => value as bigint)
          : Promise.resolve<bigint>(0n),
      ]);

      const normalizedNovaToken =
        novaToken && novaToken !== "0x0000000000000000000000000000000000000000" ? (novaToken as Address) : null;

      setSnapshot({
        principalBaseline,
        sweepableYield,
        handoffRemaining,
        handoffStarted,
        principalHandedOff,
        dustBuffer,
        paused,
        novaToken: normalizedNovaToken,
        assetBalance,
        nogeBalance,
        userPrincipal,
      });
      setError(null);
      setStatus("ready");
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      console.error("FundingPool refetch failed", error);
      setError(error);
      setStatus("error");
    }
  }, [mounted, client, isConfigured, poolAddress, assetAddress, nogeAddress, walletAddress]);

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
      principalBaseline: status === "ready" ? snapshot.principalBaseline : null,
      sweepableYield: status === "ready" ? snapshot.sweepableYield : null,
      handoffRemaining: status === "ready" ? snapshot.handoffRemaining : null,
      dustBuffer: status === "ready" ? snapshot.dustBuffer : null,
      handoffStarted: status === "ready" ? snapshot.handoffStarted : null,
      principalHandedOff: status === "ready" ? snapshot.principalHandedOff : null,
      paused: status === "ready" ? snapshot.paused : null,
      novaToken: status === "ready" ? snapshot.novaToken : null,
      assetBalance:
        status === "ready" || status === "loading" ? snapshot.assetBalance : null,
      nogeBalance:
        status === "ready" || status === "loading" ? snapshot.nogeBalance : null,
      userPrincipal:
        status === "ready" || status === "loading" ? snapshot.userPrincipal : null,
      isConfigured,
      addresses: {
        pool: poolAddress,
        asset: assetAddress,
        noge: nogeAddress,
        treasury: treasuryAddress,
      },
      walletAddress,
      refetch,
    }),
    [
      status,
      error,
      snapshot,
      isConfigured,
      poolAddress,
      assetAddress,
      nogeAddress,
      treasuryAddress,
      walletAddress,
      refetch,
    ],
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
