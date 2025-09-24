"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Info, Loader2, AlertTriangle, AlertCircle } from "lucide-react";
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FUNDING_POOL_ABI, ERC20_ABI } from "@/lib/contracts";
import { useFundingPool } from "@/hooks/useFundingPool";

const TOKEN_SYMBOL = "USDC";
const TOKEN_DECIMALS = 6;
const NOGE_DECIMALS = 18;
const NOGE_FACTOR = BigInt(10) ** BigInt(12);
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
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isPending, setIsPending] = useState(false);

  const {
    status: poolStatus,
    totalDeposits,
    usdcBalance,
    nogeBalance,
    isConfigured,
    addresses,
    refetch,
    error: poolError,
  } = useFundingPool();

  const poolAddress = addresses.pool;
  const usdcAddress = addresses.usdc;
  const nogeAddress = addresses.noge;

  useEffect(() => {
    if (poolError) {
      console.error("Funding pool data error", poolError);
    }
  }, [poolError]);

  const balancesLoading = poolStatus === "idle" || poolStatus === "loading";
  const dataReady = poolStatus === "ready";

  const hasContractConfig =
    isConfigured && Boolean(poolAddress && usdcAddress && nogeAddress);

  const formattedTokenBalance = useMemo(() => {
    if (!isConnected) return "0";
    if (balancesLoading || usdcBalance === null) return "…";
    const displayBalance = usdcBalance === 0n ? DEMO_DISPLAY_BALANCE : usdcBalance;
    return formatUnits(displayBalance, TOKEN_DECIMALS);
  }, [isConnected, balancesLoading, usdcBalance]);

  const formattedNogeBalance = useMemo(() => {
    if (!isConnected) return "0";
    if (balancesLoading || nogeBalance === null) return "…";
    return formatUnits(nogeBalance, NOGE_DECIMALS);
  }, [isConnected, balancesLoading, nogeBalance]);

  const maxWithdrawableRaw = useMemo(() => {
    if (!isConnected || !dataReady || nogeBalance === null || totalDeposits === null) {
      return 0n;
    }
    const claimableByNoge = nogeBalance / NOGE_FACTOR;
    return claimableByNoge < totalDeposits ? claimableByNoge : totalDeposits;
  }, [isConnected, dataReady, nogeBalance, totalDeposits]);

  const formattedMaxWithdrawable = useMemo(() => {
    if (!isConnected) return "0";
    if (!dataReady) return "…";
    return formatUnits(maxWithdrawableRaw, TOKEN_DECIMALS);
  }, [isConnected, dataReady, maxWithdrawableRaw]);

  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: deposit, data: depositHash } = useWriteContract();
  const { writeContract: withdraw, data: withdrawHash } = useWriteContract();

  const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash });
  const {
    isLoading: isDepositing,
    isSuccess: depositSuccess,
  } = useWaitForTransactionReceipt({ hash: depositHash });
  const {
    isLoading: isWithdrawing,
    isSuccess: withdrawSuccess,
  } = useWaitForTransactionReceipt({ hash: withdrawHash });

  useEffect(() => {
    if (depositSuccess || withdrawSuccess) {
      void refetch();
    }
  }, [depositSuccess, withdrawSuccess, refetch]);

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0 || !address || !poolAddress || !usdcAddress) {
      return;
    }

    try {
      setIsPending(true);
      const amountInWei = parseUnits(amount, TOKEN_DECIMALS);

      await approve({
        address: usdcAddress,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [poolAddress, amountInWei],
      });

      await deposit({
        address: poolAddress,
        abi: FUNDING_POOL_ABI,
        functionName: "deposit",
        args: [amountInWei],
      });
    } catch (error) {
      console.error("Deposit error:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0 || !address || !poolAddress) {
      return;
    }

    try {
      setIsPending(true);
      const amountInWei = parseUnits(amount, TOKEN_DECIMALS);

      await withdraw({
        address: poolAddress,
        abi: FUNDING_POOL_ABI,
        functionName: "withdraw",
        args: [amountInWei],
      });
    } catch (error) {
      console.error("Withdraw error:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleMaxClick = () => {
    if (!hasContractConfig) return;

    if (activeTab === "deposit" && dataReady && usdcBalance !== null) {
      const depositBalance = usdcBalance === 0n ? DEMO_DISPLAY_BALANCE : usdcBalance;
      setAmount(formatUnits(depositBalance, TOKEN_DECIMALS));
    } else if (activeTab === "withdraw") {
      setAmount(formatUnits(maxWithdrawableRaw, TOKEN_DECIMALS));
    }
  };

  const actionDisabled =
    !isConnected ||
    isPending ||
    isApproving ||
    isDepositing ||
    isWithdrawing ||
    !amount ||
    parseFloat(amount) <= 0;

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
                and copy the funding pool, NOGE token, and USDC addresses into the frontend configuration so the widget can connect.
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
        {/* Tab Selector */}
        <div className="flex mb-6 bg-black/30 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("deposit")}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              activeTab === "deposit" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              activeTab === "withdraw" ? "bg-purple-600 text-white" : "text-gray-400 hover:text-white"
            }`}
          >
            Withdraw
          </button>
        </div>

        {/* Amount Input */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <label className="text-sm text-gray-400">Amount</label>
            {isConnected && (
              <div className="text-xs text-gray-400">
                {activeTab === "deposit" ? "Balance: " : "Max Withdrawable: "}
                {activeTab === "deposit"
                  ? formatAmountDisplay(formattedTokenBalance)
                  : formatAmountDisplay(formattedMaxWithdrawable)}{" "}
                {TOKEN_SYMBOL}
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="text"
              value={amount ? parseFloat(amount).toLocaleString() : ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9.]/g, '');
                setAmount(value);
              }}
              placeholder="0.00"
              className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 pr-16 text-white placeholder-gray-500 focus:border-purple-500/50 focus:outline-none"
            />
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
              {activeTab === "deposit" ? (
                <>
                  Back Nova’s launch by adding USDC now. Withdraw anytime—only yield powers audits and frontier science prep. You&apos;ll receive NOGE tokens 1:1 as your receipt.
                  <span className="block mt-1 text-purple-200">
                    Demo mode tops up mock USDC automatically if you go above your balance.
                  </span>
                </>
              ) : (
                <>
                  Burn NOGE to pull your USDC whenever you want. Principal returns to you; yield alone funds protocol safety and science programs.
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        {isConnected && (
          <div className="grid grid-cols-1 gap-3 mb-6">
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">NOGE (NOVA Genesis) Balance</p>
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
            onClick={activeTab === "deposit" ? handleDeposit : handleWithdraw}
            disabled={actionDisabled}
            className={`w-full py-4 rounded-lg font-semibold flex items-center justify-center gap-2 transition-all ${
              actionDisabled
                ? "bg-gray-700 text-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/20"
            }`}
          >
            {(isPending || isApproving || isDepositing || isWithdrawing) && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {activeTab === "deposit" ? `Deposit ${formatAmountDisplay(amount) || ""} ${TOKEN_SYMBOL}` : `Withdraw ${formatAmountDisplay(amount) || ""} ${TOKEN_SYMBOL}`}
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
