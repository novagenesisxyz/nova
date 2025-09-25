"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GenesisProgress from "@/components/GenesisProgress";
import Footer from "@/components/Footer";
import {
  Wallet,
  ArrowRight,
  Vote,
  TrendingUp,
  Heart,
  Users,
  Shield,
  Coins,
  Target,
  Gift,
} from "lucide-react";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: Wallet,
      title: "Stake USDC",
      description:
        "Connect a self-custody wallet and stake USDC into the Nova Genesis reserve on Sepolia (mainnet post-launch).",
      color: "purple",
    },
    {
      icon: Coins,
      title: "Mint NOGE (your claim)",
      description:
        "Every USDC staked mints NOGE 1:1. Hold NOGE as your withdrawal ticket throughout Genesis.",
      color: "blue",
    },
    {
      icon: TrendingUp,
      title: "Yield → funded milestones",
      description:
        "Reserve yield backs engineering, compliance, and milestone payouts for frontier science teams in the cohort.",
      color: "green",
    },
    {
      icon: Heart,
      title: "Withdraw anytime",
      description:
        "Burn NOGE to reclaim your principal whenever you need. Only earned yield stays with Nova to fund research.",
      color: "yellow",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Fund Frontier Science",
      description:
        "Direct yield to milestone-based research in disciplines like AI safety, quantum computing, and biosecurity.",
    },
    {
      icon: Users,
      title: "Democratic Allocation",
      description:
        "Holders and stakers advise where yield goes. Your principal remains withdrawable.",
    },
    {
      icon: Shield,
      title: "Fully Transparent",
      description:
        "On-chain receipts and clear reporting of protocol costs, allocations, and impact.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Stake USDC → Mint NOGE → fund frontier science
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Genesis staking creates the reserve that lets Nova aim stablecoin yield at milestone-driven research. Your principal stays yours—only the yield powers labs. Follow the flow to see what happens when you stake.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/#deposit-section"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all"
              >
                Stake USDC & mint NOGE
              </Link>
            </div>
          </motion.div>

          {/* Visual Process Flow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <div className="mb-12">
              <GenesisProgress compact />
            </div>
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              What happens when you stake today
            </h2>

            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 via-blue-500 to-green-500 hidden lg:block transform -translate-y-1/2" />

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative"
                  >
                    <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all">
                      <div
                        className={`w-16 h-16 bg-${step.color}-500/20 rounded-xl flex items-center justify-center mb-4 mx-auto`}
                      >
                        <step.icon
                          className={`w-8 h-8 text-${step.color}-400`}
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-sm text-gray-500 mb-2">
                          Step {index + 1}
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3">
                          {step.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {step.description}
                        </p>
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <ArrowRight className="absolute -right-6 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 hidden lg:block" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* What Genesis Unlocks Next */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              What Genesis Unlocks Next
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              These features are on the roadmap and depend on a successful Genesis raise. We highlight them here so early supporters know what they are building toward.
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Coins className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      NOVA Stablecoin (Upcoming)
                    </h3>
                    <span className="text-sm text-purple-300">Target launch after Genesis close</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-gray-300">
                  <li>Buy NOVA 1:1 for USD once reserves migrate from Aave to treasury infrastructure.</li>
                  <li>Let yield flow automatically to audited frontier science allocations.</li>
                  <li>Redeem NOVA back to USD assets with transparent, on-chain accounting.</li>
                </ul>

                <div className="mt-6 p-4 bg-purple-500/10 rounded-lg">
                  <p className="text-purple-300 text-sm">
                    <Gift className="w-4 h-4 inline mr-1" />
                    <span className="font-semibold">Powered by you:</span> Genesis supporters earn the right to redeem NOVA at par through their NOGE receipts.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Vote className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Quadratic Allocation Platform (Planned)
                    </h3>
                    <span className="text-sm text-blue-300">Opens after NOVA issuance</span>
                  </div>
                </div>

                <ul className="space-y-3 text-sm text-gray-300">
                  <li>Stake NOVA or USDC to advise which initiatives receive matched yield allocation.</li>
                  <li>Vote-weighted governance shapes budget splits across scientific disciplines.</li>
                  <li>Real-time dashboards surface impact metrics for every supported project.</li>
                </ul>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <Vote className="w-4 h-4 inline mr-1" />
                    <span className="font-semibold">Early input:</span> Genesis stakers join design reviews that finalize these mechanics.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-600/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  Your stake keeps the roadmap moving
                </h3>
                <p className="text-gray-300 mb-6">
                  Until those features ship, the one action that matters is staking USDC for NOGE receipts.
                </p>
                <button
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                  onClick={() => window.open("/#deposit-section", "_self")}
                >
                  Open Staking Widget
                </button>
              </div>
            </div>
          </motion.div>

          {/* Science Diligence */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              How Nova Vets Frontier Science (demo process)
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              USC ISI anchors our diligence workflow. Every research initiative moves through partner intake, milestone design, and continuous monitoring before receiving yield-backed frontier science support.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-purple-300" />
                  <h3 className="text-lg font-semibold text-white">Partner Intake</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Labs such as USC ISI submit program briefs with safety credentials, institutional backing, and team bios before entering the queue.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Target className="w-5 h-5 text-blue-300" />
                  <h3 className="text-lg font-semibold text-white">Milestone Design</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Advisory council members co-author measurable milestones, budget guardrails, and data-sharing requirements before any USDC is routed.
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="w-5 h-5 text-green-300" />
                  <h3 className="text-lg font-semibold text-white">Continuous Monitoring</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  Nova publishes monthly transparency packets with experiment status, spend-to-milestone matching, and any safety variance reports.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Why Frontier Science Benefits from Nova
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-purple-500/50 transition-all"
                >
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                    <benefit.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-400">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* NOVA Stablecoin Overview (simplified, consistent list style) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">Where NOVA Genesis Leads</h2>
              <p className="text-gray-300 mb-6 max-w-3xl">
                NOVA will debut once the NOVA Genesis pool is large enough to make the project self-sustainable and regulatory preparations finish. Until then we operate with a public roadmap so supporters know the frontier science milestones they are underwriting.
              </p>

              <h3 className="text-lg font-semibold text-white mb-2">Current focus</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
                <li>Pool USDC in Aave; yield funds engineering, compliance, and frontier science diligence. No venture investors—governance goes to the community.</li>
                <li>Audit smart contracts and legal structure; publish transparency reporting standards.</li>
                <li>Grant NOGE holders the right to redeem early NOVA supply once reserves migrate.</li>
              </ul>

              <h3 className="text-lg font-semibold text-white mb-2">Upcoming milestones</h3>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Transition reserves from Aave to a diversified USD treasury.</li>
                <li>Launch NOVA mint/redeem portal with real-time attestations.</li>
                <li>Open quadratic allocation seasons for vetted frontier-science initiatives.</li>
              </ul>
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-12 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Support the Future?
              </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands advancing frontier science. Your stake stays withdrawable—only yield supports research. Start with as little as $10.</p>
              <div className="flex gap-4 justify-center">
                <button
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                  onClick={() => window.open("/#deposit-section", "_self")}
                >
                  Open Staking Widget
                </button>
                <button
                  className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
                  onClick={() => window.open("/projects", "_self")}
                >
                  Preview Impact Pipeline
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
}
