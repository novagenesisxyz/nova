"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/types";
import { SUPPORTED_TOKENS } from "@/lib/constants";
import { X, Info, Zap, TrendingUp } from "lucide-react";
import { useAccount } from "wagmi";

interface StakingModalProps {
  project: Project;
  onClose: () => void;
}

export default function StakingModal({ project, onClose }: StakingModalProps) {
  const { address, isConnected } = useAccount();
  const [selectedToken, setSelectedToken] = useState("USDC");
  const [amount, setAmount] = useState("");
  const [isStaking, setIsStaking] = useState(false);

  const calculateQuadraticBonus = (amt: number) => {
    return Math.sqrt(amt) * 10;
  };

  const calculateProjectImpact = (amt: number) => {
    return amt * 0.05; // 5% estimated yield directed to project
  };

  const handleStake = async () => {
    if (!isConnected || !amount) return;

    setIsStaking(true);
    setTimeout(() => {
      setIsStaking(false);
      onClose();
    }, 2000);
  };

  const numAmount = parseFloat(amount) || 0;
  const quadraticBonus = calculateQuadraticBonus(numAmount);
  const projectYield = calculateProjectImpact(numAmount);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25 }}
          className="bg-gradient-to-br from-purple-900/90 to-blue-900/90 backdrop-blur-xl rounded-2xl p-8 max-w-lg w-full border border-purple-500/30"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Stake to Support</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg text-white mb-2">{project.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span>Goal: ${project.fundingGoal.toLocaleString()}</span>
              <span>•</span>
              <span>{project.daysLeft} days left</span>
            </div>
          </div>

          {!isConnected ? (
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6">
              <p className="text-yellow-400 text-sm">
                Please connect your wallet to stake
              </p>
            </div>
          ) : (
            <>
              {/* Token Selection */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">
                  Select Token
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {SUPPORTED_TOKENS.map((token) => (
                    <button
                      key={token.symbol}
                      onClick={() => setSelectedToken(token.symbol)}
                      className={`p-3 rounded-lg border transition-all ${
                        selectedToken === token.symbol
                          ? "bg-purple-600/30 border-purple-500 text-white"
                          : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                      }`}
                    >
                      {token.symbol}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Input */}
              <div className="mb-6">
                <label className="text-sm text-gray-400 mb-2 block">
                  Stake Amount
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors text-lg"
                  />
                  <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    {selectedToken}
                  </span>
                </div>

                <div className="flex gap-2 mt-2">
                  {[100, 500, 1000, 5000].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset.toString())}
                      className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded text-sm text-gray-400 hover:text-white transition-all"
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Impact Preview */}
              {numAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white/5 rounded-lg p-4 mb-6 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      Quadratic Bonus
                    </span>
                    <span className="text-yellow-400 font-semibold">
                      +${quadraticBonus.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-400" />
                      Project Yield (Est.)
                    </span>
                    <span className="text-green-400 font-semibold">
                      ${projectYield.toFixed(2)}/year
                    </span>
                  </div>
                  <div className="pt-3 border-t border-white/10">
                    <div className="flex justify-between items-center">
                      <span className="text-white">Total Impact</span>
                      <span className="text-xl font-bold text-white">
                        ${(numAmount + quadraticBonus).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Info Box */}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-6">
                <div className="flex gap-2">
                  <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-300">
                    Your stake acts as a vote for this project. Platform yields
                    are distributed to projects based on total stake weight.
                  </p>
                </div>
              </div>

              {/* Stake Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStake}
                disabled={!numAmount || isStaking}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-xl hover:shadow-purple-500/20 transition-all"
              >
                {isStaking
                  ? "Processing..."
                  : `Stake ${numAmount ? `$${numAmount}` : ""} ${selectedToken}`}
              </motion.button>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
