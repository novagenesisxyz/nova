"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { formatUnits, parseUnits } from "viem";
import { CONTRACTS } from "@/lib/contracts";
import { useFundingPool } from "@/hooks/useFundingPool";
import { BarChart3, Target, ArrowUpRight, CheckCircle, Clock } from "lucide-react";

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

const numberFmt = new Intl.NumberFormat("en-US", {
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

  const { raised, remaining, percentTotal, goalValue, milestones } = useMemo(() => {
    const goalValueNum = goalUnits ? Number(formatUnits(goalUnits, TOKEN_DECIMALS)) : 0;
    const hasLiveData = poolStatus === "ready" && totalDeposits !== null;
    const raisedValue = hasLiveData ? Number(formatUnits(totalDeposits, TOKEN_DECIMALS)) : 0;
    const remainingValue = goalValueNum > raisedValue ? goalValueNum - raisedValue : 0;
    const pct = goalValueNum > 0 ? Math.min((raisedValue / goalValueNum) * 100, 100) : 0;
    const milestoneValues = goalValueNum > 0 ? buildMilestones(goalValueNum) : [];

    return {
      raised: raisedValue,
      remaining: remainingValue,
      percentTotal: pct,
      goalValue: goalValueNum,
      milestones: milestoneValues,
    };
  }, [poolStatus, totalDeposits]);

  const milestoneState = useMemo(() => {
    if (milestones.length === 0) {
      return {
        currentIndex: -1,
        currentTarget: 0,
        previousTarget: 0,
        percentToTarget: 0,
        remainingToTarget: 0,
        completedAll: false,
      };
    }

    let currentIndex = milestones.findIndex((target) => raised < target);
    let completedAll = false;

    if (currentIndex === -1) {
      currentIndex = milestones.length - 1;
      completedAll = raised >= milestones[currentIndex];
    }

    const currentTarget = milestones[currentIndex];
    const previousTarget = currentIndex > 0 ? milestones[currentIndex - 1] : 0;
    const targetSpan = Math.max(currentTarget - previousTarget, 1);
    const clampedRaised = Math.min(raised, currentTarget);
    const percentToTarget = completedAll
      ? 100
      : Math.min(Math.max(((clampedRaised - previousTarget) / targetSpan) * 100, 0), 100);
    const remainingToTarget = completedAll ? 0 : Math.max(currentTarget - raised, 0);

    return {
      currentIndex,
      currentTarget,
      previousTarget,
      percentToTarget,
      remainingToTarget,
      completedAll,
    };
  }, [milestones, raised]);

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
  const goalDisplay = goalValue ? numberFmt.format(goalValue) : "0";
  const hasMilestones = milestoneState.currentIndex >= 0 && milestones.length > 0;
  const nextTargetLabel = milestoneState.completedAll
    ? "All targets achieved"
    : hasMilestones
    ? `Target ${milestoneState.currentIndex + 1}: ${formatUsd(milestoneState.currentTarget)}`
    : "Milestone targets pending configuration";
  const milestonePercentLabel = milestoneState.completedAll
    ? "100% complete"
    : hasMilestones
    ? `${numberFmt.format(Math.round(milestoneState.percentToTarget))}% to target`
    : "Awaiting goal data";

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
            Genesis Reserves Goal
          </p>
          <h3 className={compact ? "text-2xl font-semibold text-white" : "text-3xl font-bold text-white"}>
            {formatUsd(goalValue)}
          </h3>
          {!compact && (
            <p className="text-xs text-gray-400 mt-1">
              Tiered milestones keep momentum visible from day one.
            </p>
          )}
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
            {numberFmt.format(Math.round(percentTotal))}% of goal
          </p>
        </div>
      </div>

      <div className="mb-3 flex items-center justify-between text-xs text-gray-400">
        <span>{nextTargetLabel}</span>
        <span>{milestonePercentLabel}</span>
      </div>

      <div className={`w-full bg-black/30 rounded-full overflow-hidden ${barHeight}`}>
        <div
          className="bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 h-full rounded-full transition-all"
          style={{ width: `${hasMilestones ? milestoneState.percentToTarget : 0}%` }}
        />
      </div>

      {!milestoneState.completedAll && hasMilestones && (
        <p className="mt-3 text-xs text-gray-500">
          {formatUsd(milestoneState.remainingToTarget)} remaining to unlock this target.
        </p>
      )}

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-300">
        <div className="bg-black/30 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400">Raised</p>
          <p className="text-base font-semibold text-white">{formatUsd(raised)}</p>
        </div>
        <div className="bg-black/30 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400">Remaining (overall)</p>
          <p className="text-base font-semibold text-white">{formatUsd(remaining)}</p>
        </div>
        <div className="bg-black/30 rounded-lg p-3 border border-white/5">
          <p className="text-xs text-gray-400">Goal (USDC)</p>
          <p className="text-base font-semibold text-white">{goalDisplay}</p>
        </div>
      </div>

      {!compact && milestones.length > 0 && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {milestones.map((target, index) => {
            const isComplete = raised >= target;
            const isActive = index === milestoneState.currentIndex && !milestoneState.completedAll;
            const statusLabel = isComplete
              ? "Target achieved"
              : isActive
              ? "Currently in progress"
              : "Upcoming milestone";
            const statusIcon = isComplete ? (
              <CheckCircle className="w-4 h-4 text-green-300" />
            ) : isActive ? (
              <Clock className="w-4 h-4 text-purple-200" />
            ) : (
              <ArrowUpRight className="w-4 h-4 text-blue-200" />
            );

            return (
              <div
                key={target}
                className={`rounded-lg border p-4 transition-colors ${
                  isComplete
                    ? "border-green-400/40 bg-green-500/10"
                    : isActive
                    ? "border-purple-400/40 bg-purple-500/10"
                    : "border-white/10 bg-black/30"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs uppercase tracking-wide text-gray-400">
                    Target {index + 1}
                  </p>
                  {statusIcon}
                </div>
                <p className="text-lg font-semibold text-white">{formatUsd(target)}</p>
                <p className="text-xs text-gray-300 mt-2">{statusLabel}</p>
              </div>
            );
          })}
        </div>
      )}

      {!compact && (
        <p className="mt-4 text-xs text-gray-400 flex items-center gap-2">
          <ArrowUpRight className="w-3 h-3 text-purple-300" />
          Your deposits remain yours. Only the yield generated goes to the protocol.
        </p>
      )}
    </motion.div>
  );
}
