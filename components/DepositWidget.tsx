"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Wallet, Info, Loader2 } from "lucide-react";
import { useAccount, useBalance, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { parseUnits, formatUnits } from "viem";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { FUNDING_POOL_ABI, ERC20_ABI, CONTRACTS } from "@/lib/contracts";

const token = { symbol: "USDC", address: CONTRACTS.USDC, decimals: 6 } as const;

export default function DepositWidget() {
  const [amount, setAmount] = useState("");
  const [activeTab, setActiveTab] = useState<"deposit" | "withdraw">("deposit");

  const getPoolAddress = () => CONTRACTS.FUNDING_POOL;

  const { address, isConnected } = useAccount();
  const { openConnectModal } = useConnectModal();
  const [isPending, setIsPending] = useState(false);

  const { data: tokenBalance } = useBalance({ address, token: token.address });

  const { data: poolTotalDeposits } = useReadContract({
    address: getPoolAddress(),
    abi: FUNDING_POOL_ABI,
    functionName: "totalDeposits",
    args: [],
  });

  const { data: nogeBalance } = useBalance({
    address: address,
    token: CONTRACTS.NOGE_TOKEN,
  });

  const { writeContract: approve, data: approveHash } = useWriteContract();
  const { writeContract: deposit, data: depositHash } = useWriteContract();
  const { writeContract: withdraw, data: withdrawHash } = useWriteContract();

  const { isLoading: isApproving } = useWaitForTransactionReceipt({
    hash: approveHash,
  });

  const { isLoading: isDepositing } = useWaitForTransactionReceipt({
    hash: depositHash,
  });

  const { isLoading: isWithdrawing } = useWaitForTransactionReceipt({
    hash: withdrawHash,
  });

  const handleDeposit = async () => {
    if (!amount || parseFloat(amount) <= 0 || !address) return;

    try {
      setIsPending(true);
      const amountInWei = parseUnits(amount, token.decimals);

      // First approve the token spend
      await approve({
        address: token.address,
        abi: ERC20_ABI,
        functionName: "approve",
        args: [getPoolAddress(), amountInWei],
      });

      // Wait a moment for approval to process
      setTimeout(async () => {
        // Then deposit
        await deposit({
          address: getPoolAddress(),
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
      const amountInWei = parseUnits(amount, token.decimals);

      // Directly withdraw (pool burns NOGE, no approval required)
      await withdraw({
        address: getPoolAddress(),
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
      setAmount(formatUnits(tokenBalance.value, token.decimals));
    } else if (activeTab === "withdraw") {
      const factor = BigInt(10) ** BigInt(12); // 18 -> 6
      const noge = nogeBalance?.value ?? BigInt(0);
      const claimableByNoge = noge / factor;
      const poolCap = (poolTotalDeposits as bigint | undefined) ?? BigInt(0);
      const maxOut = claimableByNoge < poolCap ? claimableByNoge : poolCap;
      setAmount(formatUnits(maxOut, token.decimals));
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
              activeTab === "deposit"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Deposit
          </button>
          <button
            onClick={() => setActiveTab("withdraw")}
            className={`flex-1 py-2 px-4 rounded-md font-semibold transition-all ${
              activeTab === "withdraw"
                ? "bg-purple-600 text-white"
                : "text-gray-400 hover:text-white"
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
                  ? tokenBalance ? formatUnits(tokenBalance.value, token.decimals).slice(0, 10) : "0"
                  : (() => {
                      const factor = BigInt(10) ** BigInt(12);
                      const noge = nogeBalance?.value ?? BigInt(0);
                      const claimableByNoge = noge / factor;
                      const poolCap = (poolTotalDeposits as bigint | undefined) ?? BigInt(0);
                      const maxOut = claimableByNoge < poolCap ? claimableByNoge : poolCap;
                      return formatUnits(maxOut, token.decimals).slice(0, 10);
                    })()
                } USDC
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
                  Withdrawing requires NOGE (NOVA Genesis) tokens equal to the withdrawal amount. You can withdraw your original principal at any time. During the soft launch, yield supports kickstarting Nova and is not paid to depositors.
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
                  const noge = nogeBalance?.value ?? BigInt(0);
                  const claimableByNoge = noge / factor;
                  const poolCap = (poolTotalDeposits as bigint | undefined) ?? BigInt(0);
                  const maxOut = claimableByNoge < poolCap ? claimableByNoge : poolCap;
                  return formatUnits(maxOut, token.decimals).slice(0, 10);
                })()}
                <span className="text-sm text-gray-400 ml-1">{token.symbol}</span>
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
              {isPending || isApproving ? "Approving..." :
               isDepositing ? "Depositing..." :
               isWithdrawing ? "Withdrawing..." :
               activeTab === "deposit" ? "Deposit" : "Withdraw"}
              {!(isPending || isApproving || isDepositing || isWithdrawing) && (
                <> {amount || "0"} {token.symbol}</>
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