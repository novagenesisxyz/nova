"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Shield,
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle,
  Heart,
  Globe,
  Wallet,
  Clock,
  MessageCircle,
  Twitter,
} from "lucide-react";
import faqs from "@/lib/faqs";
import DepositWidget from "@/components/DepositWidget";
import GenesisProgress from "@/components/GenesisProgress";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex flex-col">
      <Navbar />

      <main className="flex-1">
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
            <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight md:leading-[1.15] mb-6">
              Other Stablecoins keep your yield
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Nova funds frontier science
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Instead of going to corporate profits, yield from Nova's reserves helps the world by funding frontier breakthroughs with top scientists and labs.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-6">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                onClick={() => document.getElementById('deposit-section')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Wallet className="w-5 h-5" />
                Back Nova’s Launch
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

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-400"
            >
              <span>Looking to connect?</span>
              <div className="flex items-center gap-3">
                <a
                  href={SOCIAL_LINKS.towns}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/40 px-4 py-1.5 text-white hover:bg-purple-500/10 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Join NOVA Towns
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-1.5 text-white hover:bg-white/10 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  Follow on X
                </a>
              </div>
            </motion.div>

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
              Building a Stablecoin for Frontier Science
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Nova directs reserve interest into milestone-based frontier science programs.
              By participating in Nova's launch, you are helping engineers, physicists,
              and science teams secure predictable funding for breakthrough research.
            </p>

            <div className="flex justify-center mb-10">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium border border-white/20 transition-colors"
              >
                Explore Science Initiatives
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <Globe className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Frontier Disciplines</h3>
                <p className="text-sm text-gray-400">Quantum materials, AI alignment, biosecurity, and space systems</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <Users className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Institutional Partners</h3>
                <p className="text-sm text-gray-400">Work directly with labs like USC ISI under advisory oversight</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Yield-Backed Research</h3>
                <p className="text-sm text-gray-400">Your principal stays safe—only yield funds lab milestones</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Partner Spotlight */}
      <section className="px-4 pb-12">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-purple-300 mb-2">
                  Partner Spotlight
                </p>
                <h2 className="text-3xl font-bold text-white mb-3">
                  USC Information Sciences Institute
                </h2>
                <p className="text-gray-300 max-w-2xl">
                  Nova’s genesis cohort launches alongside USC ISI, where autonomous science agents and biosafety platforms are being co-developed with national labs. Genesis supporters underwrite diligence, infrastructure, and researcher time so these programs can reach deployment-ready milestones.
                </p>
              </div>
              <div className="grid sm:grid-cols-3 gap-4 w-full md:w-auto">
                <div className="bg-black/40 rounded-xl border border-purple-500/20 p-4">
                  <p className="text-xs text-purple-200 uppercase tracking-wide mb-1">Focus</p>
                  <p className="text-lg font-semibold text-white">AI autonomy, biosecurity, lab automation</p>
                </div>
                <div className="bg-black/40 rounded-xl border border-blue-500/20 p-4">
                  <p className="text-xs text-blue-200 uppercase tracking-wide mb-1">Programs in flight</p>
                  <p className="text-3xl font-bold text-white">3</p>
                  <p className="text-xs text-gray-400">Pilots with DoE facilities & Broad Institute</p>
                </div>
                <div className="bg-black/40 rounded-xl border border-green-500/20 p-4">
                  <p className="text-xs text-green-200 uppercase tracking-wide mb-1">Milestones</p>
                  <p className="text-sm text-gray-300">Safety evaluations, national-lab pilots, open benchmark releases</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-sm text-gray-400 uppercase tracking-[0.2em] mb-3">
                Demo collaboration network
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-300">
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">USC ISI Autonomous Systems</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">Stanford Quantum Lab</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">Broad Institute Biosurveillance</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">Lawrence Livermore Fusion Science</span>
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10">Caltech Space Systems Lab</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Genesis Overview */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 md:p-10"
          >
            <div className="grid lg:grid-cols-[1.1fr,0.9fr] gap-8 items-start">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">How Nova Works</h2>
                <p className="text-gray-300 mb-6 max-w-2xl">
                  Deposit USDC, receive NOGE receipts, and let reserve yield back frontier science with partners like USC ISI. Withdraw anytime—only yield funds diligence, security, and research milestones.
                </p>

                <div className="grid sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <div className="text-xs text-purple-200 uppercase tracking-wide mb-2">Step 1</div>
                    <h3 className="text-lg font-semibold text-white mb-1">Deposit USDC</h3>
                    <p className="text-sm text-gray-400">Connect wallet, mint NOGE 1:1, keep principal withdrawable.</p>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <div className="text-xs text-blue-200 uppercase tracking-wide mb-2">Step 2</div>
                    <h3 className="text-lg font-semibold text-white mb-1">Yield → Frontier Science</h3>
                    <p className="text-sm text-gray-400">Aave v3 interest funds compliance, safety, and vetted lab milestones.</p>
                  </div>
                  <div className="bg-black/30 border border-white/10 rounded-xl p-4">
                    <div className="text-xs text-green-200 uppercase tracking-wide mb-2">Step 3</div>
                    <h3 className="text-lg font-semibold text-white mb-1">Exit Anytime</h3>
                    <p className="text-sm text-gray-400">Burn NOGE to withdraw principal instantly. Governance stays community-led.</p>
                  </div>
                </div>

                <div className="bg-black/30 border border-white/10 rounded-xl p-4 mb-6">
                  <p className="text-sm text-gray-300 font-semibold mb-2">Three-phase roadmap</p>
                  <ul className="text-sm text-gray-400 space-y-2 list-disc list-inside">
                    <li><span className="text-white font-medium">Phase 1 — Launch (Genesis):</span> bootstrap reserves, fund diligence and audits.</li>
                    <li><span className="text-white font-medium">Phase 2 — Treasury migration:</span> move to diversified USD backing and open mint/redeem.</li>
                    <li><span className="text-white font-medium">Phase 3 — Frontier science allocations:</span> community-guided yield flows to labs worldwide.</li>
                  </ul>
                </div>

                <Link
                  href="/how-it-works"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium border border-white/20 transition-colors"
                >
                  Learn more about Nova's Launch
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="bg-black/30 border border-white/10 rounded-xl p-5">
                <p className="text-sm text-gray-400 mb-4">Demo progress toward the USDC goal</p>
                <GenesisProgress compact />
                <p className="text-xs text-gray-500 mt-4">
                  Values shown here are demo data for preview. Live attestations publish before launch.
                </p>
              </div>
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
              <p className="text-sm text-gray-300">See protocol costs and frontier science allocations</p>
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


      {/* Deposit Section */}
      <section id="deposit-section" className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white text-center mb-8">Back Nova’s Launch</h2>
            <p className="text-xl text-gray-300 text-center mb-4">
              Add USDC to the Genesis reserve so Nova can start funding frontier science.
            </p>

            <DepositWidget />
            <div className="mt-8 space-y-6">

              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-gray-300 font-semibold">Withdraw anytime</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    NOGE receipts redeem 1:1 for your USDC during Genesis. Keep them safe—burning NOGE is how withdrawals happen.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Shield className="w-5 h-5 text-blue-400" />
                    <span className="text-sm text-gray-300 font-semibold">Audited + transparent</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Smart contracts are audited and open source. Transparency reporting starts with the Genesis pool and expands for NOVA launch.
                  </p>
                </div>
                <div className="bg-white/5 backdrop-blur-lg rounded-xl p-5 border border-white/10">
                  <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-5 h-5 text-yellow-400" />
                    <span className="text-sm text-gray-300 font-semibold">Launch timeline</span>
                  </div>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Funds remain in Aave until audits and compliance finish. Genesis supporters will be first to redeem NOVA once the new treasury goes live.
                  </p>
                </div>
              </div>
            </div>
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
            {faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                whileHover={{ scale: 1.02 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-xl font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      </main>

      <Footer />
    </div>
  );
}
