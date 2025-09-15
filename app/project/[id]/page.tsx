"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import StakingModal from "@/components/StakingModal";
import FundingChart from "@/components/FundingChart";
import { mockProjects } from "@/lib/mockData";
import { SUPPORTED_TOKENS } from "@/lib/constants";
import {
  Users,
  Clock,
  TrendingUp,
  Zap,
  CheckCircle,
  Calendar,
  Building,
  ArrowUp,
  Coins,
  AlertCircle,
} from "lucide-react";

export default function ProjectDetailPage() {
  const params = useParams();
  const [showStakingModal, setShowStakingModal] = useState(false);
  const [realTimeFunding, setRealTimeFunding] = useState(0);

  const project = mockProjects.find((p) => p.id === params.id);

  useEffect(() => {
    if (project) {
      setRealTimeFunding(project.currentFunding);
      const interval = setInterval(() => {
        setRealTimeFunding((prev) => prev + Math.random() * 100);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [project]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Project not found
      </div>
    );
  }

  const fundingPercentage = (realTimeFunding / project.fundingGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <Navbar />

      <div className="pt-24 pb-20">
        {/* Hero Section */}
        <div className="relative h-96 overflow-hidden">
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-lg rounded-full text-sm text-white">
                  {project.category}
                </span>
                <span className="px-3 py-1 bg-white/20 backdrop-blur-lg rounded-full text-sm text-white">
                  {project.researchArea}
                </span>
              </div>
              <h1 className="text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl">
                {project.description}
              </p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-purple-100">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <p className="text-sm leading-relaxed">
                This page is a product preview. Funding numbers, milestones, and activity are mock data demonstrating how Nova will showcase real initiatives after the stablecoin launches.
              </p>
            </div>
            <button
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
              onClick={() => window.open("/#deposit-section", "_self")}
            >
              Visit Deposit Widget
            </button>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats Bar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-400">QF Score</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {project.quadraticScore}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-400">Backers</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {project.backers}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-400">Days Left</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      {project.daysLeft}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-400">Matching</span>
                    </div>
                    <p className="text-2xl font-bold text-white">
                      ${(project.matchingPool / 1000).toFixed(0)}k
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Video */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  Project Video
                </h2>
                <div className="relative aspect-video rounded-lg overflow-hidden bg-black/50">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="Project Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </motion.div>

              {/* About */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  About this Research
                </h2>
                <p className="text-gray-300 leading-relaxed mb-4">
                  {project.longDescription}
                </p>

                {project.institution && (
                  <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                    <Building className="w-5 h-5 text-gray-400" />
                    <span className="text-gray-300">{project.institution}</span>
                  </div>
                )}
              </motion.div>

              {/* Milestones */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  Research Milestones
                </h2>
                <div className="space-y-4">
                  {project.milestones.map((milestone, index) => (
                    <div key={milestone.id} className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            milestone.completed
                              ? "bg-green-500/20 border-2 border-green-500"
                              : "bg-white/10 border-2 border-white/20"
                          }`}
                        >
                          {milestone.completed ? (
                            <CheckCircle className="w-5 h-5 text-green-400" />
                          ) : (
                            <span className="text-white font-bold">
                              {index + 1}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">
                          {milestone.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-2">
                          {milestone.description}
                        </p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="flex items-center gap-1 text-gray-500">
                            <Calendar className="w-4 h-4" />
                            {new Date(
                              milestone.targetDate,
                            ).toLocaleDateString()}
                          </span>
                          <span className="text-purple-400">
                            ${milestone.fundingRequired.toLocaleString()}{" "}
                            required
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Funding Chart */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <h2 className="text-2xl font-bold text-white mb-4">
                  Funding Progress
                </h2>
                <FundingChart projectId={project.id} />
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Funding Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30 sticky top-24"
              >
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Funding Progress</span>
                    <span className="text-white font-bold">
                      {fundingPercentage.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3 overflow-hidden mb-4">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(fundingPercentage, 100)}%`,
                      }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Current</span>
                      <span className="text-xl font-bold text-white">
                        ${realTimeFunding.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Goal</span>
                      <span className="text-lg text-gray-300">
                        ${project.fundingGoal.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-white/10">
                      <span className="text-gray-400">Matching Pool</span>
                      <span className="text-lg text-green-400">
                        +${project.matchingPool.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowStakingModal(true)}
                  className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-purple-500/20 transition-all flex items-center justify-center gap-2"
                >
                  <Coins className="w-5 h-5" />
                  Stake Now
                </motion.button>

                <div className="mt-4 p-3 bg-white/5 rounded-lg">
                  <p className="text-xs text-gray-400 mb-2">Accepted Tokens:</p>
                  <div className="flex flex-wrap gap-2">
                    {project.acceptedTokens.map((token) => (
                      <span
                        key={token}
                        className="px-2 py-1 bg-white/10 rounded text-xs text-white"
                      >
                        {token}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ArrowUp className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">
                      Live funding updates
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Creator Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10"
              >
                <h3 className="text-lg font-semibold text-white mb-3">
                  Research Lead
                </h3>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-blue-400 rounded-full" />
                  <div>
                    <p className="text-white font-medium">
                      {project.creator.slice(0, 6)}...
                      {project.creator.slice(-4)}
                    </p>
                    <p className="text-xs text-gray-400">Verified Researcher</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {showStakingModal && (
        <StakingModal
          project={project}
          onClose={() => setShowStakingModal(false)}
        />
      )}
    </div>
  );
}
