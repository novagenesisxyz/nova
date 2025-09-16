"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import GenesisProgress from "@/components/GenesisProgress";
import {
  AlertTriangle,
  BarChart3,
  Coins,
  Shield,
  CheckCircle,
  Building,
  Target,
  Lock,
} from "lucide-react";

const roadmap = [
  {
    title: "Phase 1 — Genesis (live)",
    description:
      "Pool USDC in Aave, accrue interest to fund engineering, legal, and audit work. Depositors hold NOGE receipts and can exit anytime.",
    icon: Coins,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    title: "Phase 2 — Treasury migration",
    description:
      "Move reserves from Aave to a diversified USD backing structure, publish attestations, and open the NOVA mint/redeem portal to NOGE holders first.",
    icon: Building,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    title: "Phase 3 — Public-good yield",
    description:
      "Launch ongoing NOVA issuance where most yield funds public goods. Community governance allocates the impact budget and sets policy.",
    icon: Shield,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
  },
];

const supporterBenefits = [
  {
    title: "Redeemable NOVA access",
    description:
      "Genesis depositors become the first cohort who can redeem NOVA at par when the stablecoin launches.",
  },
  {
    title: "Governance voice",
    description:
      "NOGE holders help ratify treasury policies and transparency standards before NOVA circulates widely.",
  },
  {
    title: "Transparent reporting",
    description:
      "Monthly updates will show reserve holdings, protocol costs, and impact allocations—starting with the NOVA Genesis pool itself.",
  },
];

const principles = [
  {
    title: "Conservative backing",
    description:
      "Reserves target short-duration U.S. Treasuries and insured cash. We will not deploy NOVA collateral into risky or leveraged strategies.",
    icon: Lock,
    iconBg: "bg-yellow-500/20",
    iconColor: "text-yellow-400",
  },
  {
    title: "Regulatory-first posture",
    description:
      "Nova is designed around GENIUS Act requirements and money transmission rules. Compliance partners are part of the NOVA Genesis budget.",
    icon: Shield,
    iconBg: "bg-green-500/20",
    iconColor: "text-green-400",
  },
  {
    title: "Radical transparency",
    description:
      "We will publish wallet addresses, attestations, and a detailed cost policy so supporters can track every dollar.",
    icon: CheckCircle,
    iconBg: "bg-purple-500/20",
    iconColor: "text-purple-400",
  },
  {
    title: "Impact-first budgeting",
    description:
      "Protocol costs cover compliance, security, and operations. The majority of yield is reserved for public-good allocations set with community input.",
    icon: Target,
    iconBg: "bg-blue-500/20",
    iconColor: "text-blue-400",
  },
];

const fundingFocus = [
  {
    title: "Finalize policy + compliance",
    description:
      "Legal structure, GENIUS Act alignment, and regulator conversations are covered by Genesis funds.",
  },
  {
    title: "Build custody + treasury stack",
    description:
      "Integrations with banks, trustees, and attestation partners so NOVA launches fully backed.",
  },
  {
    title: "Audit & transparency tooling",
    description:
      "Smart-contract audits, reporting dashboards, and public documentation to keep the system accountable.",
  },
];

export default function NovaTokenPage() {
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
              <AlertTriangle className="w-4 h-4 text-yellow-300" />
              <span className="text-sm text-purple-300">
                Nova stablecoin is in development — Genesis deposits fund the launch
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              NOVA Stablecoin Preview
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              NOVA will be a fully-backed USD stablecoin where reserve yield supports
              public goods. Today we are raising the NOVA Genesis pool so we can build the
              infrastructure, secure audits, and launch NOVA with transparent reserves.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <Link
                href="/#deposit-section"
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all"
              >
                Deposit USDC for NOGE
              </Link>
              <Link
                href="/how-it-works"
                className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                See Genesis Explained
              </Link>
            </div>
          </motion.div>

          <div className="mb-12">
            <GenesisProgress compact />
          </div>

          {/* Roadmap */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold text-white">Genesis → NOVA Roadmap</h2>
              </div>
              <p className="text-gray-400 mb-6">
                Each phase depends on the prior one closing out successfully. Timelines will be
                co-announced with the community once audits complete.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {roadmap.map((item) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className="bg-black/40 rounded-xl p-5 border border-white/10"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.iconBg}`}>
                      <item.icon className={`w-6 h-6 ${item.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Supporter Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">
                What Genesis Supporters Receive
              </h2>
              <p className="text-gray-300 mb-6 max-w-3xl">
                Participating in Genesis is not a speculative yield play—it is how we
                bootstrap a stablecoin that permanently funds public goods. Here is what you
                get for backing the launch today.
              </p>

              <div className="grid md:grid-cols-3 gap-6">
                {supporterBenefits.map((benefit) => (
                  <div
                    key={benefit.title}
                    className="bg-black/40 rounded-xl border border-white/10 p-5"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Reserve Principles */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Reserve & Compliance Principles</h2>
              <p className="text-gray-400 mb-4">
                These guardrails shape every decision we are funding with Genesis capital. Detailed
                policies will be published before NOVA issues.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {principles.map((principle) => (
                  <div
                    key={principle.title}
                    className="bg-black/40 rounded-xl p-5 border border-white/10"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${principle.iconBg}`}>
                      <principle.icon className={`w-6 h-6 ${principle.iconColor}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{principle.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Funding Focus */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-6 text-center">
                What Genesis Funds Right Now
              </h2>

              <div className="grid md:grid-cols-3 gap-6">
                {fundingFocus.map((item) => (
                  <div
                    key={item.title}
                    className="bg-black/40 rounded-xl border border-white/10 p-5 text-center"
                  >
                    <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-purple-500/10 border border-purple-500/30 rounded-xl text-sm text-purple-200 text-center">
                Placeholder KPI values in this demo are illustrative. Real reserve balances,
                issuance, and attestations will go live with the NOVA launch.
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
