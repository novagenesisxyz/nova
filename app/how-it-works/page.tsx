"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import {
  Wallet,
  ArrowRight,
  Vote,
  DollarSign,
  TrendingUp,
  Heart,
  Users,
  Shield,
  ChevronDown,
  ChevronUp,
  Zap,
  Coins,
  Target,
  Gift,
} from "lucide-react";
import { useState } from "react";

export default function HowItWorksPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const steps = [
    {
      icon: Wallet,
      title: "Connect Your Wallet",
      description:
        "Link your digital wallet (like MetaMask) to get started. Think of it as your secure login to Web3.",
      color: "purple",
    },
    {
      icon: DollarSign,
      title: "Get USDC",
      description:
        "Buy USDC - a widely used stablecoin pegged to $1 USD. It's liquid and simple to use.",
      color: "blue",
    },
    {
      icon: DollarSign,
      title: "Deposit to Earn",
      description:
        "Deposit USDC to the pool. You'll receive NOGE (NOVA Genesis) receipt tokens 1:1 with your deposit.",
      color: "green",
    },
    {
      icon: TrendingUp,
      title: "Kickstart Nova",
      description:
        "During the soft launch, Aave interest accrues to the pool to help bootstrap Nova. You can withdraw your principal anytime using NOGE (NOVA Genesis) receipts.",
      color: "yellow",
    },
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Support Public Goods",
      description:
        "Direct yield to public goods that benefit everyone. Research may appear first, with more categories to follow.",
    },
    {
      icon: Users,
      title: "Democratic Funding",
      description:
        "Holders and stakers advise where yield goes. Broad participation matters most.",
    },
    {
      icon: Shield,
      title: "Fully Transparent",
      description:
        "On-chain receipts and clear reporting of protocol costs, allocations, and impact.",
    },
  ];

  const faqs = [
    {
      question: "What is a stablecoin?",
      answer:
        "A stablecoin is a type of cryptocurrency designed to maintain a stable value relative to a reference asset, like the US Dollar. USDC, DAI, and NOVA are designed for stability rather than speculation, making them suitable for supporting public goods.",
    },
    {
      question: "What is staking?",
      answer:
        "Staking means locking your stablecoins to support a specific project. Think of it like casting a vote with your money - the more people stake to a project, the more funding it can receive from the platform. You can unstake and get your money back after the funding period.",
    },
    {
      question: "How does quadratic funding work?",
      answer:
        "Quadratic funding is a democratic way to distribute funds. It amplifies the impact of smaller contributors - the number of people supporting a project matters more than the amount each person gives. This ensures popular projects with broad support get more funding.",
    },
    {
      question: "What is NOVA?",
      answer:
        "NOVA is our stablecoin. It’s designed so most yield supports public goods, while a minimal, transparent portion covers protocol operations like compliance and security. Public-good categories may roll out starting with research.",
    },
    {
      question: "How do public-good initiatives receive funds?",
      answer:
        "Initiatives receive funds in stablecoins directly to their project wallets. Funding can be released by milestones for accountability. All transactions are transparent and tracked on-chain.",
    },
    {
      question: "Is this safe?",
      answer:
        "Yes. Smart contracts are audited and non-custodial, and we follow GENIUS Act requirements. We publish clear disclosures about protocol costs and allocations.",
    },
  ];

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
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <Zap className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">
                Simple • Transparent • Impactful
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              How Nova Works
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Support public goods in 4 simple steps. No complex crypto
              knowledge needed — we make participation as easy as online
              shopping.
            </p>
          </motion.div>

          {/* Visual Process Flow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Your Journey to Funding Public Goods
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

          {/* Two Ways to Support Public Goods */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-4">
              Two Ways to Support Public Goods
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-3xl mx-auto">
              Nova offers two complementary paths — use one or both to maximize your impact
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              {/* Path 1: NOVA Holdings */}
              <div className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 backdrop-blur-lg rounded-2xl p-6 border border-purple-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                    <Coins className="w-6 h-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Path 1: Buy & Hold NOVA
                    </h3>
                    <span className="text-sm text-purple-300">
                      Passive Support
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 font-bold text-sm">
                        1
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Buy NOVA stablecoin
                      </p>
                      <p className="text-gray-400 text-sm">
                        Exchange USD or other stablecoins for NOVA
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 font-bold text-sm">
                        2
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Yield accrues on reserves</p>
                      <p className="text-gray-400 text-sm">Most yield supports public goods; minimal, transparent costs cover compliance and security</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 font-bold text-sm">
                        3
                      </span>
                    </div>
                    <div>
                      <p className="text-white font-medium">Directed to public goods</p>
                      <p className="text-gray-400 text-sm">Advised by holders and stakers via the platform</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-purple-500/10 rounded-lg">
                  <p className="text-purple-300 text-sm">
                    <Gift className="w-4 h-4 inline mr-1" />
                    <span className="font-semibold">Impact:</span> Holding NOVA helps fund public goods over time
                  </p>
                </div>
              </div>

              {/* Path 2: Staking */}
              <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                    <Vote className="w-6 h-6 text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Path 2: Stake to Vote
                    </h3>
                    <span className="text-sm text-blue-300">
                      Active Participation
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Stake any stablecoin
                      </p>
                      <p className="text-gray-400 text-sm">
                        Lock USDC, DAI, or NOVA to projects
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Your stake = your vote
                      </p>
                      <p className="text-gray-400 text-sm">Determines which public-good initiatives receive support</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-blue-400 font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="text-white font-medium">
                        Direct funding flow
                      </p>
                      <p className="text-gray-400 text-sm">Initiatives with more stakes get more of the platform’s support</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-500/10 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    <Vote className="w-4 h-4 inline mr-1" />
                    <span className="font-semibold">Power:</span> You help decide which public goods get funded
                  </p>
                </div>
              </div>
            </div>

            {/* Combined Impact */}
            <div className="bg-gradient-to-r from-purple-600/10 via-blue-600/10 to-green-600/10 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="text-center">
                <h3 className="text-xl font-bold text-white mb-3">
                  Maximum Impact: Use Both!
                </h3>
                <p className="text-gray-300 mb-6">Hold NOVA to generate ongoing support for public goods while staking to direct where those funds go</p>

                {/* Desktop Layout */}
                <div className="hidden md:flex items-center justify-center gap-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">
                      $50/year
                    </div>
                    <div className="text-sm text-gray-400">
                      per $1000 NOVA held
                    </div>
                  </div>
                  <div className="text-2xl text-gray-600">+</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      Your Vote
                    </div>
                    <div className="text-sm text-gray-400">
                      directs the funding
                    </div>
                  </div>
                  <div className="text-2xl text-gray-600">=</div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">
                      Real Impact
                    </div>
                    <div className="text-sm text-gray-400">for public goods</div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="md:hidden space-y-4">
                  <div className="bg-purple-500/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-purple-400">
                      $50/year
                    </div>
                    <div className="text-sm text-gray-400">
                      per $1000 NOVA held
                    </div>
                  </div>

                  <div className="text-lg text-gray-500">+</div>

                  <div className="bg-blue-500/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-400">
                      Your Vote
                    </div>
                    <div className="text-sm text-gray-400">
                      directs the funding
                    </div>
                  </div>

                  <div className="text-lg text-gray-500">=</div>

                  <div className="bg-green-500/10 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-400">
                      Real Impact
                    </div>
                    <div className="text-sm text-gray-400">for public goods</div>
                  </div>
                </div>
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
              Why Public Goods Benefit from Nova
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

          {/* NOVA Token Explainer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/30">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-4">
                    The NOVA Stablecoin
                  </h2>
                  <p className="text-gray-300 mb-4">
                    NOVA is a digital dollar. It's designed so most yield supports public goods advised by holders and stakers, while a minimal, transparent portion covers protocol operations like compliance and security.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Audited, non-custodial contracts and clear disclosures</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <DollarSign className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Transparent accounting of protocol costs and allocations</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-300">Using NOVA helps fund public goods</span>
                    </li>
                  </ul>
                </div>
                <div className="flex justify-center">
                  <div className="relative">
                    <div className="w-48 h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <Coins className="w-16 h-16 text-purple-400 mx-auto mb-2" />
                        <div className="text-3xl font-bold text-white">
                          $1.00
                        </div>
                        <div className="text-sm text-gray-400">Always</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-20"
          >
            <h2 className="text-3xl font-bold text-white text-center mb-12">
              Frequently Asked Questions
            </h2>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index }}
                  className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className="text-lg font-medium text-white">
                      {faq.question}
                    </span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-purple-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {openFaq === index && (
                    <div className="px-6 pb-4">
                      <p className="text-gray-300 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </motion.div>
              ))}
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
                Ready to Fund the Future?
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">Join thousands of people supporting public goods. Start with as little as $10.</p>
              <div className="flex gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl hover:shadow-purple-500/20 transition-all">
                  Get Started
                </button>
                <button className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all">
                  View Projects
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
