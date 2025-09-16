"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Info, Loader2, AlertTriangle } from "lucide-react";
import {
  useAccount,
  useBalance,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FUNDING_POOL_ABI, ERC20_ABI, CONTRACTS } from "@/lib/contracts";

const TOKEN_SYMBOL = "USDC";
const TOKEN_DECIMALS = 6;

export default function DepositWidget() {
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isPending, setIsPending] = useState(false);

  const poolAddress = CONTRACTS.FUNDING_POOL;
  const usdcAddress = CONTRACTS.USDC;
  const nogeAddress = CONTRACTS.NOGE_TOKEN;
  const isConfigured = Boolean(poolAddress && usdcAddress && nogeAddress);

  const { data: tokenBalance } = useBalance({
    address,
    token: usdcAddress,
    query: { enabled: Boolean(isConfigured && address && usdcAddress) },
  });

  const { data: poolTotalDeposits } = useReadContract({
    address: poolAddress,
    abi: FUNDING_POOL_ABI,
    functionName: "totalDeposits",
    args: [],
    query: { enabled: isConfigured },
  });

  const { data: nogeBalance } = useBalance({
    address,
    token: nogeAddress,
    query: { enabled: Boolean(isConfigured && address && nogeAddress) },
  });

  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: deposit, data: depositHash } = useWriteContract();
  const { writeContract: withdraw, data: withdrawHash } = useWriteContract();

  const { isLoading: isApproving } = useWaitForTransactionReceipt({ hash: approveHash });
  const { isLoading: isDepositing } = useWaitForTransactionReceipt({ hash: depositHash });
  const { isLoading: isWithdrawing } = useWaitForTransactionReceipt({ hash: withdrawHash });

  if (!isConfigured || !poolAddress || !usdcAddress || !nogeAddress) {
    return (
      <div className="max-w-md mx-auto">
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-2xl p-6 text-purple-100">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 mt-1" />
            <div>
              <h3 className="text-lg font-semibold mb-2">Contracts not configured</h3>
              <p className="text-sm leading-relaxed">
                Missing contract addresses. Deploy the contracts (e.g. <code className="font-mono">make deploy-sepolia</code>)
                and add the printed values for <code className="font-mono">NEXT_PUBLIC_FUNDING_POOL_USDC_ADDRESS</code>,
                <code className="font-mono">NEXT_PUBLIC_NOGE_TOKEN_ADDRESS</code>, and <code className="font-mono">NEXT_PUBLIC_USDC_ADDRESS</code>
                to your environment.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0 || !address) return;

    try {
      setIsPending(true);
      const amountInWei = parseUnits(amount, TOKEN_DECIMALS);

      await approve({
        address: usdcAddress,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [poolAddress, amountInWei],
      });

      setTimeout(async () => {
        await deposit({
          address: poolAddress,
          abi: FUNDING_POOL_ABI,
          functionName: "deposit",
          args: [amountInWei],
        });
      }, 2000);
    } catch (error) {
      console.error("Deposit error:", error);
    } finally {
      setIsPending(false);
    }
  };

  const handleWithdraw = async () => {
    if (!amount || parseFloat(amount) <= 0 || !address) return;

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
    if (activeTab === "deposit" && tokenBalance) {
      setAmount(formatUnits(tokenBalance.value, TOKEN_DECIMALS));
    } else if (activeTab === "withdraw") {
      const factor = BigInt(10) ** BigInt(12);
      const noge = nogeBalance?.value ?? 0n;
      const claimableByNoge = noge / factor;
      const poolCap = (poolTotalDeposits as bigint | undefined) ?? 0n;
      const maxOut = claimableByNoge < poolCap ? claimableByNoge : poolCap;
      setAmount(formatUnits(maxOut, TOKEN_DECIMALS));
    }
  };

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
                  ? tokenBalance
                    ? formatUnits(tokenBalance.value, TOKEN_DECIMALS).slice(0, 10)
                    : "0"
                  : (() => {
                      const factor = BigInt(10) ** BigInt(12);
                      const noge = nogeBalance?.value ?? 0n;
                      const claimableByNoge = noge / factor;
                      const poolCap = (poolTotalDeposits as bigint | undefined) ?? 0n;
                      const maxOut = claimableByNoge < poolCap ? claimableByNoge : poolCap;
                      return formatUnits(maxOut, TOKEN_DECIMALS).slice(0, 10);
                    })()}{" "}
                {TOKEN_SYMBOL}
              </div>
            )}
          </div>
          <div className="relative">
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
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
                <>You'll receive NOGE (NOVA Genesis) tokens 1:1 with your deposit. These tokens are your receipt and are required to withdraw your funds at any time.</>
              ) : (
                <>
                  Withdrawing requires NOGE (NOVA Genesis) tokens equal to the withdrawal amount. You can withdraw your original principal at any time. During the genesis phase, yield supports launching Nova and is not paid to depositors.
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        {isConnected && (
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">Max Withdrawable</p>
              <p className="text-lg font-semibold text-white">
                {(() => {
                  const factor = BigInt(10) ** BigInt(12);
                  const noge = nogeBalance?.value ?? 0n;
                  const claimableByNoge = noge / factor;
                  const poolCap = (poolTotalDeposits as bigint | undefined) ?? 0n;
                  const maxOut = claimableByNoge < poolCap ? claimableByNoge : poolCap;
                  return formatUnits(maxOut, TOKEN_DECIMALS).slice(0, 10);
                })()}
                <span className="text-sm text-gray-400 ml-1">{TOKEN_SYMBOL}</span>
              </p>
            </div>
            <div className="bg-black/30 rounded-lg p-3">
              <p className="text-xs text-gray-400 mb-1">NOGE (NOVA Genesis) Balance</p>
              <p className="text-lg font-semibold text-white">
                {nogeBalance ? formatUnits(nogeBalance.value, 18).slice(0, 10) : "0"}
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
          <div className="space-y-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={activeTab === "deposit" ? handleDeposit : handleWithdraw}
              disabled={!amount || parseFloat(amount) <= 0 || isPending || isApproving || isDepositing || isWithdrawing}
              className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {(isPending || isApproving || isDepositing || isWithdrawing) && (
                <Loader2 className="w-5 h-5 animate-spin" />
              )}
              {isPending || isApproving
                ? "Approving..."
                : isDepositing
                ? "Depositing..."
                : isWithdrawing
                ? "Withdrawing..."
                : activeTab === "deposit"
                ? "Deposit"
                : "Withdraw"}
              {!(isPending || isApproving || isDepositing || isWithdrawing) && (
                <> {amount || "0"} {TOKEN_SYMBOL}</>
              )}
            </motion.button>

            <p className="text-center text-sm text-gray-400">
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}
