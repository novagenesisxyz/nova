"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import {
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Sparkles,
  CreditCard,
  Coins,
} from "lucide-react";
import { mockProjects } from "@/lib/mockData";
import ProjectCard from "@/components/ProjectCard";

export default function Home() {
  const featuredProjects = mockProjects.slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">
                Powered by Quadratic Funding
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
              Fund the Future of
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                Scientific Research
              </span>
            </h1>

            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Like using the credit card of your favorite brand, but for funding
              breakthrough research. Stake stablecoins to vote on projects. Buy
              NOVA to support research. All yields go directly to scientists.
            </p>

            <div className="flex gap-4 justify-center mb-12">
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-500 text-white rounded-lg font-semibold flex items-center gap-2 hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                >
                  Explore Projects
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/10 backdrop-blur-lg text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
              >
                Learn More
              </motion.button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <p className="text-3xl font-bold text-white">$200M</p>
                <p className="text-sm text-gray-400">Total Staked</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <p className="text-3xl font-bold text-white">127</p>
                <p className="text-sm text-gray-400">Active Projects</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <p className="text-3xl font-bold text-white">$2.4M</p>
                <p className="text-sm text-gray-400">Sent to Projects</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <p className="text-3xl font-bold text-white">12,847</p>
                <p className="text-sm text-gray-400">Backers</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white text-center mb-4">
              Research Funding, Reimagined
            </h2>
            <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
              Think of it as your research impact card - your stakes vote on
              projects while all yields fund breakthrough science
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-purple-900/20 to-purple-900/5 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20"
              >
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Stake to Direct Funding
                </h3>
                <p className="text-gray-400">
                  Your staked stablecoins act as votes. The platform's yields
                  flow to projects based on community staking decisions
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-900/20 to-blue-900/5 backdrop-blur-lg rounded-xl p-6 border border-blue-500/20"
              >
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Democratic Funding
                </h3>
                <p className="text-gray-400">
                  Your stake is your vote. Quadratic funding ensures smaller
                  backers have a voice alongside larger ones
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-green-900/20 to-green-900/5 backdrop-blur-lg rounded-xl p-6 border border-green-500/20"
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4">
                  <Coins className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  NOVA Stablecoin
                </h3>
                <p className="text-gray-400">
                  Buy NOVA to support research. It's a stablecoin you can always
                  redeem 1:1. Using NOVA helps fund the platform
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold text-white text-center mb-12">
              Featured Research Projects
            </h2>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {featuredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            <div className="text-center">
              <Link href="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-white/10 backdrop-blur-lg text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
                >
                  View All Projects
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-lg rounded-2xl p-12 border border-purple-500/30 text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-4">
              Start Funding the Future Today
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Connect your wallet and join thousands backing breakthrough
              research
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all"
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
