"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Coins,
  Shield,
  CheckCircle,
  Building,
  RefreshCw,
  ArrowDownRight,
  DollarSign,
  Lock,
} from "lucide-react";

export default function NovaTokenPage() {
  const stats = {
    totalIssued: 52400000,
    totalReserves: 52400000,
    researchFunded: 2400000,
    projectsSupported: 127,
    backingRatio: 100,
    redemptionTime: "1-2 business days",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <Navbar />

      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">
                100% Reserve Backed
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              NOVA Stablecoin
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A fully-backed USD stablecoin that funds scientific research.
              Every NOVA is backed 1:1 by cash and US Treasuries. GENIUS Act
              compliant.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-1">Price</p>
              <p className="text-2xl font-bold text-white">$1.00</p>
              <p className="text-xs text-gray-500">Always 1:1 with USD</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-1">Total Issued</p>
              <p className="text-2xl font-bold text-white">
                ${(stats.totalIssued / 1000000).toFixed(1)}M
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-1">Total Reserves</p>
              <p className="text-2xl font-bold text-white">
                ${(stats.totalReserves / 1000000).toFixed(1)}M
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-1">Research Funded</p>
              <p className="text-2xl font-bold text-green-400">
                ${(stats.researchFunded / 1000000).toFixed(1)}M
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-1">Backing</p>
              <p className="text-2xl font-bold text-white">
                {stats.backingRatio}%
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10"
            >
              <p className="text-sm text-gray-400 mb-1">Projects</p>
              <p className="text-2xl font-bold text-white">
                {stats.projectsSupported}
              </p>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* Reserve Backing */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                Reserve Composition
              </h2>
              <div className="space-y-4">
                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">US Treasuries</span>
                    <span className="text-white font-semibold">80%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="h-full bg-blue-500 rounded-full"
                      style={{ width: "80%" }}
                    />
                  </div>
                </div>

                <div className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">
                      Cash Deposits (FDIC Insured)
                    </span>
                    <span className="text-white font-semibold">20%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="h-full bg-green-500 rounded-full"
                      style={{ width: "20%" }}
                    />
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">
                      GENIUS Act Compliant
                    </span>
                  </div>
                </div>

                <div className="mt-2 p-3 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400">
                      Monthly Attestations Published
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How it Works */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <h2 className="text-2xl font-bold text-white mb-4">
                How NOVA Works
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      1:1 USD Backing
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Every NOVA is backed by exactly $1 in reserves held in US
                      banks and Treasuries
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Regulatory Compliant
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Fully compliant with GENIUS Act requirements for
                      USD-backed stablecoins
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Coins className="w-5 h-5 text-green-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Support Research
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Buy NOVA to provide stable funding for research. Every
                      NOVA purchase helps generate support that flows to
                      scientists
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-yellow-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-1">
                      Transparent & Audited
                    </h3>
                    <p className="text-gray-400 text-sm">
                      Monthly attestations and regular third-party audits ensure
                      full transparency
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Actions */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-gradient-to-br from-purple-900/30 to-purple-900/10 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <RefreshCw className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Mint NOVA</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Trade USDC, DAI, or other stablecoins for NOVA at 1:1 rate
              </p>
              <button className="w-full py-3 bg-purple-600/30 hover:bg-purple-600/50 text-white rounded-lg font-semibold transition-all">
                Mint NOVA
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-gradient-to-br from-green-900/30 to-green-900/10 backdrop-blur-lg rounded-xl p-6 border border-green-500/30"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <ArrowDownRight className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white">Redeem</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Convert NOVA back to USD stablecoins at any time
              </p>
              <button className="w-full py-3 bg-green-600/30 hover:bg-green-600/50 text-white rounded-lg font-semibold transition-all">
                Redeem
              </button>
            </motion.div>
          </div>

          {/* Compliance & Security */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
            className="bg-white/5 backdrop-blur-lg rounded-xl p-8 border border-white/10"
          >
            <h2 className="text-3xl font-bold text-white mb-6 text-center">
              Compliance & Security
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  GENIUS Act Compliant
                </h3>
                <p className="text-sm text-gray-400">
                  Fully compliant with US stablecoin regulations
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Building className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Bank-Grade Security
                </h3>
                <p className="text-sm text-gray-400">
                  Reserves held in FDIC-insured accounts and US Treasuries
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Monthly Audits
                </h3>
                <p className="text-sm text-gray-400">
                  Third-party attestations published monthly
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
