"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Info, Loader2, AlertTriangle, AlertCircle } from "lucide-react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { GENESIS_POOL_ABI, ERC20_ABI } from "@/lib/contracts";
import { useFundingPool } from "@/hooks/useFundingPool";

const TOKEN_SYMBOL = "USDC";
const TOKEN_DECIMALS = 6;
const NOGE_DECIMALS = 18;
const DEMO_DISPLAY_BALANCE = parseUnits("15000", TOKEN_DECIMALS);

function formatAmountDisplay(value: string): string {
  // Preserve placeholders
  if (value === "…" || value === "-") return value;

  const [intPartRaw, fracPartRaw] = value.split(".");
  const intWithCommas = intPartRaw.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  if (!fracPartRaw) return intWithCommas;

  // Show up to 2 decimals, trimming trailing zeros
  const trimmed = fracPartRaw.slice(0, 2).replace(/0+$/g, "");
  return trimmed ? `${intWithCommas}.${trimmed}` : intWithCommas;
}

export default function DepositWidget() {
  const [amount, setAmount] = useState("");

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isPending, setIsPending] = useState(false);

  const {
    status: poolStatus,
    assetBalance,
    nogeBalance,
    userPrincipal,
    paused,
    handoffStarted,
    principalHandedOff,
    isConfigured,
    addresses,
    refetch,
    error: poolError,
  } = useFundingPool();

  const poolAddress = addresses.pool;
  const assetAddress = addresses.asset;
  const nogeAddress = addresses.noge;

  useEffect(() => {
    if (poolError) {
      console.error("Funding pool data error", poolError);
    }
  }, [poolError]);

  const balancesLoading = poolStatus === "idle" || poolStatus === "loading";
  const dataReady = poolStatus === "ready";

  const hasContractConfig =
    isConfigured && Boolean(poolAddress && assetAddress && nogeAddress);

  const formattedTokenBalance = useMemo(() => {
    if (!isConnected) return "0";
    if (balancesLoading || assetBalance === null) return "…";
    const displayBalance = assetBalance === 0n ? DEMO_DISPLAY_BALANCE : assetBalance;
    return formatUnits(displayBalance, TOKEN_DECIMALS);
  }, [isConnected, balancesLoading, assetBalance]);

  const formattedNogeBalance = useMemo(() => {
    if (!isConnected) return "0";
    if (balancesLoading || nogeBalance === null) return "…";
    return formatUnits(nogeBalance, NOGE_DECIMALS);
  }, [isConnected, balancesLoading, nogeBalance]);

  const formattedUserPrincipal = useMemo(() => {
    if (!isConnected) return "0";
    if (!dataReady || userPrincipal === null) return "…";
    return formatUnits(userPrincipal, TOKEN_DECIMALS);
  }, [isConnected, dataReady, userPrincipal]);

  const depositsOpen =
    dataReady && paused === false && handoffStarted === false && principalHandedOff === false;

  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: deposit, data: depositHash } = useWriteContract();

  const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash });
  const {
    isLoading: isDepositing,
    isSuccess: depositSuccess,
  } = useWaitForTransactionReceipt({ hash: depositHash });

  useEffect(() => {
    if (depositSuccess) {
      void refetch();
    }
  }, [depositSuccess, refetch]);

  const handleReserve = async () => {
    if (!amount || parseFloat(amount) <= 0 || !address || !poolAddress || !assetAddress) {
      return;
    }

    try {
      setIsPending(true);
      const amountInWei = parseUnits(amount, TOKEN_DECIMALS);

      await approve({
        address: assetAddress,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [poolAddress, amountInWei],
      });

      await deposit({
        address: poolAddress,
        abi: GENESIS_POOL_ABI,
        functionName: "deposit",
        args: [amountInWei],
      });
    } catch (error) {
      console.error("Reserve error:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleMaxClick = () => {
    if (!hasContractConfig || !dataReady || assetBalance === null) return;

    const balance = assetBalance === 0n ? DEMO_DISPLAY_BALANCE : assetBalance;
    setAmount(formatUnits(balance, TOKEN_DECIMALS));
  };

  const actionDisabled =
    !isConnected ||
    isPending ||
    isApproving ||
    isDepositing ||
    !amount ||
    parseFloat(amount) <= 0 ||
    !depositsOpen;

  if (!hasContractConfig) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 text-purple-100">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Contracts not configured</h3>
              <p className="text-sm leading-relaxed">
                Missing contract addresses. Deploy the contracts (e.g. <code className="font-mono">make deploy-sepolia</code>)
                and copy the Genesis pool, NOGE token, and asset addresses into the frontend configuration so the widget can connect.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20"
      >
        {/* Amount Input */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-400">Amount to reserve</label>
            {isConnected && (
              <div className="text-xs text-gray-400">
                Balance: {formatAmountDisplay(formattedTokenBalance)} {TOKEN_SYMBOL}
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              inputMode="decimal"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 pr-24 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none appearance-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
            <span className="absolute right-20 top-1/2 -translate-y-1/2 text-sm text-gray-400">USDC</span>
            <button
              onClick={handleMaxClick}
              className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 rounded-md text-sm font-semibold transition-colors"
            >
              MAX
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mb-6 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-blue-400 mt-0.5" />
            <div className="text-xs text-blue-300">
              Reserve USDC in the Genesis pool to lock your NOVA allocation. You&apos;ll receive NOGE (NOVA Genesis) advisory tokens. When NOVA launches, you can claim NOVA 1:1 on this site.
              <span className="block mt-1 font-semibold text-yellow-300">
                ⚠️ Reservations are non-refundable until the NOVA claim window opens.
              </span>
            </div>
          </div>
        </div>

        {dataReady && !depositsOpen && (
          <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
            <div className="text-xs text-red-200">
              Reservations are currently disabled while governance completes the principal handoff. Please check back once the NOVA claim window opens.
            </div>
          </div>
        )}

        {/* Stats */}
        {dataReady && isConnected && (
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Reserved NOVA</p>
              <p className="text-lg font-semibold text-white">
                {formatAmountDisplay(formattedUserPrincipal)}
                <span className="text-sm text-gray-400 ml-1">NOVA</span>
              </p>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">NOGE (NOVA Genesis) balance</p>
              <p className="text-lg font-semibold text-white">
                {formatAmountDisplay(formattedNogeBalance)}
                <span className="text-sm text-gray-400 ml-1">NOGE</span>
              </p>
            </div>
          </div>
        )}

        {/* Action Button */}
        {!isConnected ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={openConnectModal}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all"
          >
            <Wallet className="w-5 h-5" />
            Connect Wallet
          </motion.button>
        ) : (
          <motion.button
            whileHover={{ scale: actionDisabled ? 1 : 1.02 }}
            whileTap={{ scale: actionDisabled ? 1 : 0.98 }}
            onClick={handleReserve}
            disabled={actionDisabled}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              actionDisabled
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/20"
            }`}
          >
            {(isPending || isApproving || isDepositing) && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            Reserve {formatAmountDisplay(amount) || ""} NOVA
          </motion.button>
        )}

        {isConnected && address && (
          <p className="text-xs text-gray-500 text-center mt-4">
            Connected: {address.slice(0, 6)}...{address.slice(-4)}
          </p>
        )}

        {/* Testnet Notice */}
        <div className="mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
          <p className="text-xs text-yellow-200">
            <span className="font-semibold">This is a testnet environment on Ethereum Sepolia.</span>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
