"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Sparkles,
  Lock,
  Coins,
  CheckCircle,
  Heart,
  Globe,
  Wallet,
} from "lucide-react";
import DepositWidget from "@/components/DepositWidget";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-36 pb-24 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-transparent to-blue-600/10" />
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-600/20 rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-600/20 rounded-full filter blur-3xl animate-pulse delay-1000" />

        <div className="max-w-7xl mx-auto relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-7">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Soft launch: community bootstrap</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              Stablecoins keep your yield
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Nova funds public goods
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Most yield to public goods; minimal, transparent costs. Withdraw anytime.
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                onClick={() => document.getElementById('deposit-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Wallet className="w-5 h-5" />
                Join the bootstrap
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
              >
                How Nova Works
              </motion.button>
            </div>

            {/* Early Supporter Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <Users className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Advise yield</p>
                <p className="text-xs text-gray-400">Public goods you choose</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <CheckCircle className="w-6 h-6 text-green-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Withdraw anytime</p>
                <p className="text-xs text-gray-400">Receipts redeem 1:1</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <Shield className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-white">Audited + transparent</p>
                <p className="text-xs text-gray-400">Non-custodial, on-chain</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-black/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white text-center mb-4">
              How the Soft Launch Works
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Deposit USDC, receive NOGE (NOVA Genesis) receipts, withdraw principal anytime. Aave interest bootstraps Nova.
            </p>

            <div className="grid md:grid-cols-4 gap-6">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20"
              >
                <div className="text-3xl font-bold text-purple-400 mb-4">1</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Connect & Deposit
                </h3>
                <p className="text-gray-400 text-sm">
                  Connect wallet and deposit USDC
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20"
              >
                <div className="text-3xl font-bold text-blue-400 mb-4">2</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Get NOGE (NOVA Genesis) Receipts
                </h3>
                <p className="text-gray-400 text-sm">
                  1:1 receipts redeem your principal anytime
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-green-900/20 to-green-900/5 backdrop-blur-lg rounded-xl p-6 border border-green-500/20"
              >
                <div className="text-3xl font-bold text-green-400 mb-4">3</div>
                <h3 className="text-lg font-semibold text-white mb-2">Bootstrap Nova</h3>
                <p className="text-gray-400 text-sm">Aave V3 interest funds development</p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-yellow-900/20 to-yellow-900/5 backdrop-blur-lg rounded-xl p-6 border border-yellow-500/20"
              >
                <div className="text-3xl font-bold text-yellow-400 mb-4">4</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  Withdraw Anytime
                </h3>
                <p className="text-gray-400 text-sm">
                  Use NOGE (NOVA Genesis) to withdraw principal whenever you want
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why It's Safe */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Why Your Funds Are Safe
            </h2>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-purple-900/10 to-transparent backdrop-blur-lg rounded-xl p-8 border border-purple-500/20"
              >
                <Lock className="w-12 h-12 text-purple-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Smart Contract Security
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <span>Audited smart contracts on Ethereum mainnet</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <span>You can withdraw your deposits anytime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <span>Non-custodial - you control your funds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <span>Transparent on-chain transactions</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-blue-900/10 to-transparent backdrop-blur-lg rounded-xl p-8 border border-blue-500/20"
              >
                <Shield className="w-12 h-12 text-blue-400 mb-4" />
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Aave Integration
                </h3>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <span>Deposits are supplied via battle-tested Aave V3</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <span>$10B+ TVL protocol with proven track record</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    <span>Interest accrues automatically to the pool</span>
                  </li>

                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transparency Strip */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          >
            <div>
              <p className="text-white font-semibold">Transparent by design</p>
              <p className="text-sm text-gray-300">See protocol costs and public-goods allocations</p>
            </div>
            <Link
              href="/transparency"
              className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium border border-white/20 transition-colors"
            >
              View Transparency Ledger
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-4 bg-gradient-to-b from-transparent to-purple-950/20">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Heart className="w-16 h-16 text-purple-400 mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-6">
              Building a Stablecoin That Gives Back
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Nova will be the world's first stablecoin where interest from reserves
              goes to fund public goods. By participating in our
              soft launch, you're directly helping create a new
              financial primitive that automatically funds public goods.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Global Impact</h3>
                <p className="text-sm text-gray-400">Fund education, healthcare, climate action, and more</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Community Driven</h3>
                <p className="text-sm text-gray-400">Transparent tracking of impact and beneficiaries</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Sustainable Funding</h3>
                <p className="text-sm text-gray-400">Sustainable on-chain funding for good causes</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Deposit Section */}
      <section id="deposit-section" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white text-center mb-8">
              Join the Soft Launch
            </h2>
            <p className="text-xl text-gray-300 text-center mb-12">
              Connect your wallet to deposit USDC and receive NOGE (NOVA Genesis) receipt tokens
            </p>

            <DepositWidget />

          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                When can I withdraw my funds?
              </h3>
              <p className="text-gray-300">
                You can withdraw your principal at any time using your NOGE (NOVA Genesis) tokens. There are no lock-ups or penalties.
              </p>
            </motion.div>



            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                What happens to the interest earned during the soft launch?
              </h3>
              <p className="text-gray-300">
                During the soft launch, Aave interest is retained by the pool to kickstart Nova’s development and operations. Your principal remains withdrawable at any time. Future phases may direct funds to public-good initiatives.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                Is this audited and secure?
              </h3>
              <p className="text-gray-300">
                Yes, our smart contracts are audited and use battle-tested protocols like
                Aave V3 for liquidity management. All code is open-source and verifiable on-chain.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}