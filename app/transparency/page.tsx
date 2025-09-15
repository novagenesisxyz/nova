"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { Shield, Receipt, PieChart, ExternalLink, DollarSign, BarChart3, AlertCircle } from "lucide-react";

export default function TransparencyPage() {
  const rows = [
    { date: "2025-09-01", category: "Protocol - Compliance", amount: "$1,200", tx: "0xabc…123" },
    { date: "2025-09-02", category: "Protocol - Security (audit)", amount: "$3,500", tx: "0xdef…456" },
    { date: "2025-09-05", category: "Public Goods - Research", amount: "$5,000", tx: "0x789…abc" },
  ];
  const costBreakdown = [
    { label: "Public Goods", value: 78, color: "from-green-500 to-green-400" },
    { label: "Compliance", value: 12, color: "from-purple-500 to-purple-400" },
    { label: "Security", value: 7, color: "from-blue-500 to-blue-400" },
    { label: "Ops", value: 3, color: "from-gray-500 to-gray-400" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black">
      <Navbar />

      <section className="pt-24 pb-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/30 rounded-full mb-4">
              <Shield className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-purple-300">Preview ledger — demo figures only</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3">Transparency Ledger</h1>
            <p className="text-gray-300 max-w-2xl mx-auto">
              This page shows how we will report protocol costs and public-good allocations once NOVA launches. All numbers below are illustrative placeholders while the Genesis campaign is live.
            </p>
          </motion.div>

          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 mb-8 text-purple-100 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 mt-0.5" />
              <p className="text-sm leading-relaxed">
                Live wallet addresses, attestations, and CSV downloads will go online with the NOVA launch. Until then, follow the Genesis plan and deposit USDC to mint NOGE receipts.
              </p>
            </div>
            <button
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors"
              onClick={() => window.open("/#deposit-section", "_self")}
            >
              Go to Deposit Widget
            </button>
          </div>

          {/* Costs Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden mb-8"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-semibold">
                <BarChart3 className="w-5 h-5 text-blue-400" />
                Costs & Allocations (example)
              </div>
              <div className="text-sm text-gray-400">Kept minimal and fully disclosed</div>
            </div>

            <div className="p-6">
              <div className="h-6 w-full rounded-full bg-white/10 overflow-hidden flex">
                {costBreakdown.map((s, i) => (
                  <div
                    key={i}
                    className={`h-full bg-gradient-to-r ${s.color}`}
                    style={{ width: `${s.value}%` }}
                    title={`${s.label}: ${s.value}%`}
                  />
                ))}
              </div>

              <div className="grid sm:grid-cols-4 gap-4 mt-4">
                {costBreakdown.map((s, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-gray-400">{s.label}</div>
                    <div className="text-white font-semibold">{s.value}%</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-semibold">
                <PieChart className="w-5 h-5 text-purple-400" />
                Allocations (illustrative)
              </div>
              <Link href="#" className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1">
                Export CSV <ExternalLink className="w-4 h-4" />
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="text-gray-400 text-sm">
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Amount</th>
                    <th className="px-4 py-3">Tx</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r, i) => (
                    <tr key={i} className="border-t border-white/10">
                      <td className="px-4 py-3 text-white text-sm">{r.date}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{r.category}</td>
                      <td className="px-4 py-3 text-gray-300 text-sm">{r.amount}</td>
                      <td className="px-4 py-3 text-purple-300 text-sm">
                        <Link href={`#`}> {r.tx} </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-white/10 text-gray-400 text-sm flex items-center gap-2">
              <Receipt className="w-4 h-4" />
              This page is a placeholder. We’ll publish on-chain references and a downloadable ledger with full allocation breakdowns.
            </div>
          </motion.div>

          {/* Holdings Audit Snapshot */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden"
          >
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-semibold">
                <PieChart className="w-5 h-5 text-green-400" />
                Reserve Snapshot (illustrative)
              </div>
              <Link href="#" className="text-sm text-purple-300 hover:text-purple-200 flex items-center gap-1">
                View report <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
            <div className="p-6 grid md:grid-cols-2 gap-6 items-center">
              <div className="flex justify-center">
                {/* Donut chart using CSS gradients (placeholder) */}
                <div
                  className="relative w-48 h-48 rounded-full"
                  style={{
                    background:
                      "conic-gradient(#22c55e 0% 60%, #3b82f6 60% 90%, #a855f7 90% 100%)",
                  }}
                >
                  <div className="absolute inset-6 rounded-full bg-black" />
                </div>
              </div>
              <div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-gray-400">Cash & Treasuries</div>
                    <div className="text-white font-semibold">60%</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-gray-400">Stablecoin Reserves</div>
                    <div className="text-white font-semibold">30%</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="text-sm text-gray-400">Ops Float</div>
                    <div className="text-white font-semibold">10%</div>
                  </div>
                </div>
                <p className="text-gray-400 text-sm mt-4">
                  Percentages are illustrative. We’ll publish attested values with links to source data.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
