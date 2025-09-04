"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Zap, TrendingUp, Coins } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-xl border-b border-purple-500/20 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and Navigation */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center space-x-2 flex-shrink-0"
            >
              <Zap className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-white">NOVA</span>
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/projects"
                className="text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors"
              >
                Discover
              </Link>
              <Link
                href="/how-it-works"
                className="text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors"
              >
                How it Works
              </Link>
              <Link
                href="/nova-token"
                className="text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors flex items-center gap-1.5"
              >
                <Coins className="w-4 h-4" />
                <span>NOVA Token</span>
              </Link>
            </nav>
          </div>

          {/* Right side - Stats and Wallet */}
          <div className="flex items-center space-x-6">
            {/* TVL Display */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span>TVL: $2.4M</span>
            </div>

            {/* Connect Wallet Button */}
            <ConnectButton />
          </div>
        </div>
      </div>
    </nav>
  );
}
