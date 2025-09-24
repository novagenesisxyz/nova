"use client";

import Link from "next/link";
import { Twitter } from "lucide-react";
import { SOCIAL_LINKS } from "@/lib/constants";
import { TownsIcon } from "./TownsIcon";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black/60 backdrop-blur-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-purple-400 mb-2">
              Nova Community
            </p>
            <h3 className="text-2xl font-semibold text-white">
              Stay close to the people funding the future of science.
            </h3>
            <p className="text-sm text-gray-400 mt-2 max-w-xl">
              Join the discussion for project updates, diligence workshops, and lab briefings. Follow X for announcements and milestone highlights.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={SOCIAL_LINKS.towns}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-purple-500/30 bg-purple-500/10 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500/20 transition-colors"
            >
              <TownsIcon className="w-4 h-4" />
              Join NOVA Towns
            </a>
            <a
              href={SOCIAL_LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white hover:bg-white/15 transition-colors"
            >
              <Twitter className="w-4 h-4" />
              Follow on X
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 text-xs text-gray-500">
          <p>
            © {new Date().getFullYear()} Nova Labs Cooperative. Designed for transparent frontier science funding.
            <br className="hidden sm:block" />
            <span>Nova Genesis is in preview; numbers shown today are demo figures while launch prep continues.</span>
            <br className="hidden sm:block" />
            <span>NOVA channels reserve yield into frontier science initiatives. Holders do not receive interest.</span>
          </p>
          <div className="flex items-center gap-4">
            <Link href="/how-it-works" className="hover:text-purple-300 transition-colors">
              How it Works
            </Link>
            <Link href="/transparency" className="hover:text-purple-300 transition-colors">
              Transparency
            </Link>
            <Link href="/projects" className="hover:text-purple-300 transition-colors">
              Projects
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
