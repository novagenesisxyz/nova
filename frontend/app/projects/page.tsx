"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ProjectCard from "@/components/ProjectCard";
import Footer from "@/components/Footer";
import { mockProjects } from "@/lib/mockData";
import { INITIATIVE_CATEGORIES } from "@/lib/constants";
import { Search, Filter, TrendingUp, Clock, Users, AlertCircle } from "lucide-react";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("quadratic");

  const filteredProjects = mockProjects.filter((project) => {
    const matchesCategory =
      selectedCategory === "All" || project.category === selectedCategory;
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case "quadratic":
        return b.quadraticScore - a.quadraticScore;
      case "funding":
        return b.currentFunding - a.currentFunding;
      case "backers":
        return b.backers - a.backers;
      case "time":
        return a.daysLeft - b.daysLeft;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex flex-col">
      <Navbar />

      <main className="flex-1">
      <div className="pt-24 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-4">
              Discover Frontier Science Initiatives
            </h1>
            <p className="text-xl text-gray-400 mb-8">
              Explore milestone-driven research programs and track community-backed funding progress
            </p>

            <div className="bg-purple-500/10 border border-purple-500/30 text-purple-200 rounded-xl p-4 mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold">Preview environment</p>
                  <p className="text-sm text-purple-100/80">
                    Project cards, totals, and backer counts are illustrative so supporters can see how Nova will route yield to real labs. Live initiatives will go through scientific diligence before NOVA launches.
                  </p>
                </div>
              </div>
              <button
                className="mt-2 sm:mt-0 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
                onClick={() => window.open("/#deposit-section", "_self")}
              >
                Open Staking Widget
              </button>
            </div>

            {/* Search and Filters */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search initiatives..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>

                <div className="flex gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-purple-500 transition-colors"
                  >
                    <option value="quadratic">QF Score</option>
                    <option value="funding">Funding</option>
                    <option value="backers">Backers</option>
                    <option value="time">Time Left</option>
                  </select>
                </div>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap gap-2 mt-4">
                <button
                  onClick={() => setSelectedCategory("All")}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === "All"
                      ? "bg-purple-600 text-white"
                      : "bg-white/10 text-gray-400 hover:text-white hover:bg-white/20"
                  }`}
                >
                  All Initiatives
                </button>
                {INITIATIVE_CATEGORIES.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedCategory === category
                        ? "bg-purple-600 text-white"
                        : "bg-white/10 text-gray-400 hover:text-white hover:bg-white/20"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats Bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-400">Demo Total Staked</span>
                </div>
                <p className="text-2xl font-bold text-white">$2.4M</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Filter className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-400">Preview Initiatives</span>
                </div>
                <p className="text-2xl font-bold text-white">
                  {sortedProjects.length}
                </p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-400">Demo Backers</span>
                </div>
                <p className="text-2xl font-bold text-white">12,847</p>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-lg p-4 border border-white/10">
                <div className="flex items-center gap-2 mb-1">
                  <Clock className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-400">Avg. Days Left (demo)</span>
                </div>
                <p className="text-2xl font-bold text-white">32</p>
              </div>
            </div>

            {/* Initiatives Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <ProjectCard project={project} />
                </motion.div>
              ))}
            </div>

            {sortedProjects.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No initiatives found matching your criteria</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
      </main>

      <Footer />
    </div>
  );
}
