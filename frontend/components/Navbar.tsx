"use client";

import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { TrendingUp, Coins, Menu, X, MessageCircle, Twitter } from "lucide-react";
import { TownsIcon } from "./TownsIcon";
import { motion, AnimatePresence } from "framer-motion";
import { NovaLogo } from "./NovaLogo";
import { useFundingPool } from "@/hooks/useFundingPool";
import { formatUnits } from "viem";
import { SOCIAL_LINKS } from "@/lib/constants";

const TOKEN_DECIMALS = 6;
const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { isConfigured, status, totalDeposits } = useFundingPool();

  const tvlDisplay = useMemo(() => {
    if (!isConfigured) {
      return "—";
    }

    if (status === "idle" || status === "loading") {
      return "…";
    }

    if (status === "error" || totalDeposits === null) {
      return "—";
    }

    const value = Number(formatUnits(totalDeposits, TOKEN_DECIMALS));
    return currency.format(value);
  }, [isConfigured, status, totalDeposits]);

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
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
                <NovaLogo className="w-8 h-8" />
                <span className="text-2xl font-bold text-white">NOVA</span>
              </Link>

              {/* Desktop Navigation Links */}
              <nav className="hidden md:flex items-center space-x-6">
                <Link
                  href="/projects"
                  className="text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors"
                >
                  Science
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
                <Link
                  href="/transparency"
                  className="text-gray-300 hover:text-purple-400 text-sm font-medium transition-colors"
                >
                  Transparency
                </Link>
              </nav>
            </div>

            {/* Right side - Stats and Wallet */}
            <div className="flex items-center gap-4">
              {/* TVL Display */}
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>TVL: {tvlDisplay}</span>
              </div>

              {/* Desktop Social Links */}
              <div className="hidden md:flex items-center gap-2">
                <a
                  href={SOCIAL_LINKS.towns}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/10 text-gray-400 hover:border-purple-400 hover:text-white transition-colors"
                >
                  <TownsIcon className="w-4 h-4" />
                  <span className="sr-only">Join NOVA Towns</span>
                </a>
                <a
                  href={SOCIAL_LINKS.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/10 text-gray-400 hover:border-purple-400 hover:text-white transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                  <span className="sr-only">Follow NOVA on X</span>
                </a>
              </div>

              {/* Desktop Connect Wallet Button */}
              <div className="hidden md:block">
                <ConnectButton />
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed right-0 top-16 bottom-0 w-full sm:w-80 bg-black/95 backdrop-blur-xl border-l border-purple-500/20 z-40 md:hidden"
            >
              <div className="flex flex-col h-full p-6">
                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-4 mb-8">
                  <Link
                    href="/projects"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-purple-400 text-lg font-medium transition-colors py-2"
                  >
                    Science
                  </Link>
                  <Link
                    href="/how-it-works"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-purple-400 text-lg font-medium transition-colors py-2"
                  >
                    How it Works
                  </Link>
                  <Link
                    href="/nova-token"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-purple-400 text-lg font-medium transition-colors flex items-center gap-2 py-2"
                  >
                    <Coins className="w-5 h-5" />
                    <span>NOVA Token</span>
                  </Link>
                  <Link
                    href="/transparency"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-purple-400 text-lg font-medium transition-colors py-2"
                  >
                    Transparency
                  </Link>
                </nav>

                {/* Mobile Stats */}
                <div className="mb-8 pb-8 border-b border-white/10">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span>Total Value Locked: {tvlDisplay}</span>
                  </div>
                </div>

                {/* Mobile Social Links */}
                <div className="mb-8 space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Community Channels
                  </p>
                  <a
                    href={SOCIAL_LINKS.towns}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-4 py-3 text-white text-sm font-medium hover:bg-purple-500/20 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Join NOVA Towns
                  </a>
                  <a
                    href={SOCIAL_LINKS.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white text-sm font-medium hover:bg-white/15 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                    Follow NOVA on X
                  </a>
                </div>

                {/* Mobile Wallet Connect */}
                <div className="mt-auto">
                  <ConnectButton.Custom>
                    {({
                      account,
                      chain,
                      openAccountModal,
                      openChainModal,
                      openConnectModal,
                      mounted,
                    }) => {
                      const ready = mounted;
                      const connected = ready && account && chain;

                      return (
                        <div
                          {...(!ready && {
                            "aria-hidden": true,
                            style: {
                              opacity: 0,
                              pointerEvents: "none",
                              userSelect: "none",
                            },
                          })}
                        >
                          {(() => {
                            if (!connected) {
                              return (
                                <button
                                  onClick={openConnectModal}
                                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                >
                                  Connect Wallet
                                </button>
                              );
                            }

                            if (chain.unsupported) {
                              return (
                                <button
                                  onClick={openChainModal}
                                  className="w-full bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                                >
                                  Wrong network
                                </button>
                              );
                            }

                            return (
                              <button
                                onClick={openAccountModal}
                                className="w-full bg-white/10 hover:bg-white/20 text-white py-3 px-4 rounded-lg font-medium transition-colors"
                              >
                                {account.displayName}
                              </button>
                            );
                          })()}
                        </div>
                      );
                    }}
                  </ConnectButton.Custom>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
