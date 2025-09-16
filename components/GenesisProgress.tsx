"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { formatUnits, parseUnits } from "viem";
import { useReadContract } from "wagmi";
import { FUNDING_POOL_ABI, CONTRACTS } from "@/lib/contracts";
import { BarChart3, Target, ArrowUpRight } from "lucide-react";

const TOKEN_DECIMALS = 6;

const goalEnv = process.env.NEXT_PUBLIC_GENESIS_GOAL_USDC;
let goalUnits: bigint | undefined;
let goalDisplay = "0";

if (goalEnv) {
  try {
    goalUnits = parseUnits(goalEnv, TOKEN_DECIMALS);
    goalDisplay = Number(goalEnv).toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  } catch (error) {
    console.warn("Invalid NEXT_PUBLIC_GENESIS_GOAL_USDC", error);
  }
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

const numberFmt = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
});

function formatUsd(value: number) {
  return currency.format(value);
}

export default function GenesisProgress({ compact = false }: { compact?: boolean }) {
  const poolAddress = CONTRACTS.FUNDING_POOL;
  const isConfigured = Boolean(poolAddress);

  const { data: poolTotalDeposits } = useReadContract({
    address: poolAddress,
    abi: FUNDING_POOL_ABI,
    functionName: "totalDeposits",
    args: [],
    query: {
      enabled: isConfigured,
    },
  });

  const { raised, remaining, percent, goalValue } = useMemo(() => {
    if (!poolTotalDeposits) {
      return { raised: 0, remaining: goalUnits ? Number(formatUnits(goalUnits, TOKEN_DECIMALS)) : 0, percent: 0, goalValue: goalUnits ? Number(formatUnits(goalUnits, TOKEN_DECIMALS)) : 0 };
    }

    const raisedValue = Number(formatUnits(poolTotalDeposits, TOKEN_DECIMALS));
    const goalValueNum = goalUnits ? Number(formatUnits(goalUnits, TOKEN_DECIMALS)) : 0;
    const remainingValue = goalValueNum > raisedValue ? goalValueNum - raisedValue : 0;
    const pct = goalValueNum > 0 ? Math.min((raisedValue / goalValueNum) * 100, 100) : 0;

    return { raised: raisedValue, remaining: remainingValue, percent: pct, goalValue: goalValueNum };
  }, [poolTotalDeposits]);

  if (!isConfigured) {
    return (
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 text-purple-100">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Genesis goal unavailable</h3>
            <p className="text-sm leading-relaxed">
              Set the funding pool address in your environment to see live progress. Populate <code className="font-mono">NEXT_PUBLIC_FUNDING_POOL_USDC_ADDRESS</code> after running the deployment script.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!goalUnits) {
    return (
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 text-purple-100">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Set a Genesis goal</h3>
            <p className="text-sm leading-relaxed">
              Define <code className="font-mono">NEXT_PUBLIC_GENESIS_GOAL_USDC</code> in your environment to show progress toward the USDC target for Nova Genesis.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const containerClasses = compact
    ? "bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
    : "bg-gradient-to-br from-purple-900/30 to-blue-900/20 backdrop-blur-lg rounded-2xl p-6 border border-white/10";

  const barHeight = compact ? "h-2" : "h-3";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={containerClasses}
    >
      <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-sm text-purple-200 font-medium flex items-center gap-2">
            <Target className="w-4 h-4" />
            Genesis Funding Goal
          </p>
          <h3 className={compact ? "text-2xl font-semibold text-white" : "text-3xl font-bold text-white"}>
            {formatUsd(goalValue)}
          </h3>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 flex items-center gap-2 justify-end">
            <BarChart3 className="w-4 h-4 text-blue-300" />
            Raised so far
          </p>
          <p className={compact ? "text-xl font-semibold text-white" : "text-2xl font-semibold text-white"}>
            {formatUsd(raised)}
          </p>
          <p className="text-xs text-gray-500">
            {numberFmt.format(Math.round(percent))}% of goal
          </p>
        </div>
      </div>

      <div className={`w-full bg-black/30 rounded-full overflow-hidden ${barHeight}`}>
        <div
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 h-full rounded-full transition-all"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-300">
        <div className="bg-black/30 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400">Raised</p>
          <p className="text-base font-semibold text-white">{formatUsd(raised)}</p>
        </div>
        <div className="bg-black/30 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400">Remaining</p>
          <p className="text-base font-semibold text-white">{formatUsd(remaining)}</p>
        </div>
        <div className="bg-black/30 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400">Goal (USDC)</p>
          <p className="text-base font-semibold text-white">{goalDisplay} {TOKEN_SYMBOL}</p>
        </div>
      </div>

      {!compact && (
        <p className="mt-4 text-xs text-gray-400 flex items-center gap-2">
          <ArrowUpRight className="w-3 h-3 text-purple-300" />
          Total deposits update in real time from the on-chain funding pool.
        </p>
      )}
    </motion.div>
  );
}
