"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { formatUnits, parseUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { useFundingPool } from "@/hooks/useFundingPool";
import { Target, ArrowUpRight } from "lucide-react";

const TOKEN_DECIMALS = 6;

const goalEnv = process.env.NEXT_PUBLIC_GENESIS_GOAL_USDC;
const milestonesEnv = process.env.NEXT_PUBLIC_GENESIS_MILESTONES_USDC;
let goalUnits: bigint | undefined;

if (goalEnv) {
  try {
    goalUnits = parseUnits(goalEnv, TOKEN_DECIMALS);
  } catch (error) {
    console.warn("Invalid NEXT_PUBLIC_GENESIS_GOAL_USDC", error);
  }
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function formatUsd(value: number) {
  return currency.format(value);
}

const fallbackMilestones = [100_000, 1_000_000, 10_000_000, 100_000_000];

function buildMilestones(goalValue: number) {
  if (!goalValue) {
    return [];
  }

  let parsedMilestones: number[] = [];

  if (milestonesEnv) {
    parsedMilestones = milestonesEnv
      .split(",")
      .map((value) => Number(value.trim()))
      .filter((value) => Number.isFinite(value) && value > 0);
  }

  if (parsedMilestones.length === 0) {
    parsedMilestones = fallbackMilestones;
  }

  const normalized = Array.from(new Set(parsedMilestones))
    .filter((value) => value > 0)
    .sort((a, b) => a - b);

  const capped = normalized.filter((value) => value <= goalValue);

  if (capped.length === 0 || capped[capped.length - 1] < goalValue) {
    capped.push(goalValue);
  }

  return capped;
}

export default function GenesisProgress({ compact = false }: { compact?: boolean }) {
  const poolAddress = CONTRACTS.FUNDING_POOL;
  const isConfigured = Boolean(poolAddress);
  const { status: poolStatus, totalDeposits } = useFundingPool();

  const { raised, milestones } = useMemo(() => {
    const goalValueNum = goalUnits ? Number(formatUnits(goalUnits, TOKEN_DECIMALS)) : 0;
    const hasLiveData = poolStatus === "ready" && totalDeposits !== null;
    const raisedValue = hasLiveData ? Number(formatUnits(totalDeposits, TOKEN_DECIMALS)) : 0;
    const milestoneValues = goalValueNum > 0 ? buildMilestones(goalValueNum) : [];

    return {
      raised: raisedValue,
      milestones: milestoneValues,
    };
  }, [poolStatus, totalDeposits]);

  if (!isConfigured) {
    return (
      <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 text-purple-100">
        <div className="flex items-start gap-3">
          <Target className="w-6 h-6 mt-1" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Genesis goal unavailable</h3>
            <p className="text-sm leading-relaxed">
              Set the reserves pool address in your environment to see live progress. Populate <code className="font-mono">NEXT_PUBLIC_FUNDING_POOL_USDC_ADDRESS</code> after running the deployment script.
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
  const nextIndex = milestones.findIndex((value) => raised < value);
  const hasMilestones = milestones.length > 0;
  const nextMilestone = nextIndex === -1 ? null : milestones[nextIndex];
  const percentToNext = nextMilestone
    ? Math.min((raised / nextMilestone) * 100, 100)
    : hasMilestones
    ? 100
    : 0;
  const roundedPercentToNext = Math.round(percentToNext);
  const remainingToNext = nextMilestone ? Math.max(nextMilestone - raised, 0) : 0;

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
            Next milestone
          </p>
          <h3 className={compact ? "text-2xl font-semibold text-white" : "text-3xl font-bold text-white"}>
            {nextMilestone ? formatUsd(nextMilestone) : "All targets reached"}
          </h3>
        </div>
        {nextMilestone && (
          <div className="text-right">
            <p className="text-sm text-gray-400">Progress</p>
            <p className={compact ? "text-xl font-semibold text-white" : "text-2xl font-semibold text-white"}>
              {roundedPercentToNext}%
            </p>
          </div>
        )}
      </div>

      <div className={`w-full bg-black/30 rounded-full overflow-hidden ${barHeight}`}>
        <div
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 h-full rounded-full transition-all"
          style={{ width: `${percentToNext}%` }}
        />
      </div>

      {nextMilestone ? (
        <p className="mt-3 text-xs text-gray-500">
          Raised {formatUsd(raised)} · {formatUsd(remainingToNext)} remaining to unlock this target.
        </p>
      ) : (
        <p className="mt-3 text-xs text-gray-500">Raised {formatUsd(raised)}. All milestone targets reached.</p>
      )}
    </motion.div>
  );
}
