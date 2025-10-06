"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950/20 to-black flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="pt-24 pb-20 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Terms of Service
              </h1>
              <p className="text-gray-400 mb-8">
                Last Updated: October 2025
              </p>

              <div className="prose prose-invert prose-purple max-w-none">

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
                  <p className="text-gray-300 mb-4">
                    By accessing or using the Nova protocol, website, or services (collectively, the &ldquo;Services&rdquo;),
                    you agree to be bound by these Terms of Service (&ldquo;Terms&rdquo;). If you do not agree to these Terms,
                    do not use the Services.
                  </p>
                  <p className="text-gray-300">
                    Nova operates as a decentralized protocol governed by smart contracts deployed on the Ethereum blockchain.
                    These Terms apply to all users, including those participating in the Genesis phase.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">2. Eligibility</h2>
                  <p className="text-gray-300 mb-4">
                    You must be at least 18 years old and have the legal capacity to enter into binding contracts.
                    By using the Services, you represent and warrant that you are of legal age in your jurisdiction,
                    you are not a resident of or located in any jurisdiction where use of the Services would be illegal or prohibited,
                    you are not subject to economic sanctions or designated on any prohibited parties list, and your use of the
                    Services complies with all applicable laws and regulations in your jurisdiction.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">3. Genesis Phase Reservations</h2>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">3.1 Non-Refundable Deposits</h3>
                  <p className="text-gray-300 mb-4">
                    USDC deposited during the Genesis phase to reserve NOVA allocations are <strong className="text-yellow-300">non-refundable</strong>.
                    By making a reservation, you acknowledge and agree that deposited USDC cannot be withdrawn or redeemed for fiat currency.
                    Your USDC will be used to bootstrap Nova&apos;s reserves and fund protocol development. There is no guaranteed timeline
                    for NOVA token launch. The protocol may fail to launch, in which case deposits may be permanently locked.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">3.2 NOVA Claim Rights</h3>
                  <p className="text-gray-300 mb-4">
                    Genesis participants receive the right to claim NOVA tokens on a 1:1 basis with their total USDC reservations
                    if and when the NOVA stablecoin launches. However, launch of NOVA is not guaranteed. The timing of launch is
                    uncertain and subject to regulatory, technical, and market conditions. The protocol reserves the right to modify
                    launch parameters, and claims may be subject to additional terms at the time of NOVA launch.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">4. NOGE Advisory Tokens</h2>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.1 Nature of NOGE</h3>
                  <p className="text-gray-300 mb-4">
                    NOGE tokens are advisory governance tokens with no economic rights or expectation of profit. NOGE tokens grant
                    voting power to advise on frontier science project allocations and are minted according to a square root formula
                    with per-address caps. NOGE tokens may be non-transferable during the Genesis phase, do not represent ownership,
                    equity, debt, or any economic interest in Nova, and have no guaranteed monetary value.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.2 Governance</h3>
                  <p className="text-gray-300">
                    NOGE holders may participate in advisory governance processes. All governance decisions are advisory only.
                    The protocol operators retain ultimate decision-making authority over fund allocations, protocol parameters,
                    and operational matters.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">5. Risks and Disclaimers</h2>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.1 Smart Contract Risks</h3>
                  <p className="text-gray-300 mb-4">
                    The Services rely on smart contracts deployed on the Ethereum blockchain. You acknowledge that smart contracts
                    may contain bugs, vulnerabilities, or design flaws, and that blockchain transactions are irreversible. You may
                    lose access to your tokens if you lose your private keys. Network congestion may delay transactions or increase costs.
                    Audits do not guarantee security or eliminate all risks.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.2 Regulatory Risks</h3>
                  <p className="text-gray-300 mb-4">
                    Cryptocurrency and DeFi regulations are evolving. You acknowledge that regulatory changes may affect the Services
                    or your ability to use them, and that the Services may be restricted or prohibited in certain jurisdictions. You
                    are responsible for compliance with your local laws and regulations. The tax treatment of tokens is uncertain and
                    may vary by jurisdiction.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.3 Market Risks</h3>
                  <p className="text-gray-300 mb-4">
                    Digital assets are volatile and speculative. You may lose some or all of your deposit.
                    Past performance is not indicative of future results.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.4 Third-Party Dependencies</h3>
                  <p className="text-gray-300">
                    The protocol integrates with third-party services including Aave, Ethereum, and others.
                    Failures or changes in these services may affect the protocol&apos;s operation.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">6. Not Investment Advice</h2>
                  <p className="text-gray-300 mb-4">
                    Nothing in these Terms or on the Services constitutes investment, financial, legal, or tax advice.
                    You should consult your own advisors before participating in the protocol. NOGE and NOVA tokens are not
                    securities, commodities, or any other regulated financial instrument. They are not investments with an
                    expectation of profit, are not guaranteed to have any monetary value, and are not FDIC insured or backed
                    by any government entity.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">7. Prohibited Activities</h2>
                  <p className="text-gray-300 mb-4">You agree not to:</p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4">
                    <li>Use the Services for any illegal purpose or in violation of any laws</li>
                    <li>Manipulate or attempt to manipulate the protocol or governance processes</li>
                    <li>Interfere with or disrupt the Services or servers</li>
                    <li>Use automated systems to access the Services without authorization</li>
                    <li>Impersonate any person or entity</li>
                    <li>Engage in wash trading, market manipulation, or other deceptive practices</li>
                    <li>Use the Services to launder money or finance illegal activities</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">8. Intellectual Property</h2>
                  <p className="text-gray-300 mb-4">
                    The smart contracts are open source under the MIT License. Website content, branding, and design elements
                    are proprietary unless otherwise specified. You may not use Nova&apos;s trademarks, logos, or branding without permission.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">9. Privacy</h2>
                  <p className="text-gray-300 mb-4">
                    Blockchain transactions are public and pseudonymous. We do not collect personal information unless you provide it voluntarily.
                    Your Ethereum address and transaction history are publicly visible on the blockchain.
                  </p>
                  <p className="text-gray-300">
                    We may collect analytics data about website usage. See our Privacy Policy for details.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">10. Limitation of Liability</h2>
                  <p className="text-gray-300 mb-4">
                    TO THE MAXIMUM EXTENT PERMITTED BY LAW, NOVA, ITS CONTRIBUTORS, AND AFFILIATES SHALL NOT BE LIABLE FOR ANY:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                    <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES</li>
                    <li>LOSS OF PROFITS, REVENUE, DATA, OR USE</li>
                    <li>LOSS OF DIGITAL ASSETS OR TOKENS</li>
                    <li>DAMAGES ARISING FROM SMART CONTRACT BUGS, FAILURES, OR EXPLOITS</li>
                    <li>DAMAGES ARISING FROM THIRD-PARTY SERVICES OR BLOCKCHAIN NETWORKS</li>
                  </ul>
                  <p className="text-gray-300 mb-4">
                    IN NO EVENT SHALL OUR TOTAL LIABILITY EXCEED THE AMOUNT YOU DEPOSITED IN THE 90 DAYS PRECEDING THE CLAIM.
                  </p>
                  <p className="text-gray-300">
                    Some jurisdictions do not allow limitation of liability for certain damages. In such jurisdictions,
                    our liability is limited to the maximum extent permitted by law.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">11. Indemnification</h2>
                  <p className="text-gray-300">
                    You agree to indemnify, defend, and hold harmless Nova, its contributors, and affiliates from any claims,
                    damages, losses, or expenses (including legal fees) arising from your use of the Services or violation of these Terms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">12. Modifications</h2>
                  <p className="text-gray-300 mb-4">
                    We reserve the right to modify these Terms at any time. Changes will be effective when posted to the website.
                    Continued use of the Services after changes constitutes acceptance of modified Terms.
                  </p>
                  <p className="text-gray-300">
                    For material changes, we will provide notice through the website or other reasonable means.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">13. Termination</h2>
                  <p className="text-gray-300">
                    We reserve the right to restrict or terminate your access to the website (but not the smart contracts)
                    at any time for any reason, including violation of these Terms. Smart contracts are immutable and cannot be terminated.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">14. Governing Law and Dispute Resolution</h2>

                  <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-6">
                    <p className="text-red-200 text-sm font-semibold mb-2">IMPORTANT - PLEASE READ CAREFULLY</p>
                    <p className="text-red-200 text-sm mb-0">
                      This section contains a mandatory arbitration provision and class action waiver that affects your legal rights.
                      You are giving up your right to go to court and to participate in class actions.
                    </p>
                  </div>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.1 Governing Law</h3>
                  <p className="text-gray-300 mb-4">
                    These Terms and any dispute arising out of or relating to the Services shall be governed by and construed
                    in accordance with the laws of the State of Delaware, United States, without regard to its conflict of law principles.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.2 Agreement to Arbitrate</h3>
                  <p className="text-gray-300 mb-4">
                    You and Nova agree that any dispute, claim, or controversy arising out of or relating to these Terms,
                    the Services, or your use of the Services (collectively, &ldquo;Disputes&rdquo;) will be settled by binding arbitration,
                    except as set forth in Section 14.4 below.
                  </p>
                  <p className="text-gray-300 mb-4">
                    <strong className="text-white">This means you are waiving your right to have Disputes resolved in court by a judge or jury.</strong>
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.3 Arbitration Rules and Procedure</h3>
                  <p className="text-gray-300 mb-4">
                    The arbitration will be administered by JAMS (Judicial Arbitration and Mediation Services) in accordance with
                    the JAMS Streamlined Arbitration Rules and Procedures (the &ldquo;JAMS Rules&rdquo;), as modified by these Terms.
                    The JAMS Rules are available at https://www.jamsadr.com or by calling 1-800-352-5267.
                  </p>

                  <div className="bg-white/5 border border-white/10 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 text-sm mb-3"><strong>Key Arbitration Terms:</strong></p>
                    <ul className="list-disc list-inside text-gray-300 text-sm space-y-2 ml-4">
                      <li><strong>Administrator:</strong> JAMS</li>
                      <li><strong>Rules:</strong> JAMS Streamlined Arbitration Rules and Procedures</li>
                      <li><strong>Location:</strong> Arbitration will be conducted in New York, New York, or another mutually agreed location</li>
                      <li><strong>Language:</strong> English</li>
                      <li><strong>Arbitrator:</strong> A single neutral arbitrator</li>
                      <li><strong>Award:</strong> The arbitrator may award any relief available in court under law or in equity</li>
                      <li><strong>Fees:</strong> Each party will bear its own costs and attorneys&apos; fees unless the arbitrator awards otherwise</li>
                    </ul>
                  </div>

                  <p className="text-gray-300 mb-4">
                    If JAMS is not available to arbitrate, the parties will select an alternative arbitral forum.
                    If the parties cannot agree on an alternative forum, either party may petition a court of competent
                    jurisdiction to appoint an arbitrator.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.4 Exceptions to Arbitration</h3>
                  <p className="text-gray-300 mb-4">
                    Notwithstanding Section 14.2, the following Disputes are not subject to arbitration:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                    <li>
                      <strong>Small Claims:</strong> Any Dispute that qualifies for small claims court may be brought
                      in small claims court in the jurisdiction where you reside or where Nova is located, at your option.
                    </li>
                    <li>
                      <strong>Injunctive Relief:</strong> Either party may seek emergency equitable relief (such as a temporary
                      restraining order or preliminary injunction) in court to preserve the status quo pending arbitration.
                    </li>
                    <li>
                      <strong>Intellectual Property:</strong> Claims of infringement or misappropriation of intellectual property
                      rights may be brought in court.
                    </li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.5 Class Action Waiver</h3>
                  <p className="text-gray-300 mb-4">
                    <strong className="text-yellow-300">
                      YOU AND NOVA AGREE THAT EACH PARTY MAY BRING DISPUTES AGAINST THE OTHER PARTY ONLY IN AN INDIVIDUAL CAPACITY,
                      AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE PROCEEDING.
                    </strong>
                  </p>
                  <p className="text-gray-300 mb-4">
                    This means you cannot bring a claim as a plaintiff or class member in a class action, the arbitrator cannot
                    consolidate more than one person&apos;s claims, the arbitrator cannot preside over any form of representative or
                    class proceeding, and the arbitrator&apos;s decision applies only to the individual who brought the claim.
                  </p>
                  <p className="text-gray-300 mb-4">
                    <strong className="text-white">
                      If a court decides that this class action waiver is unenforceable, then the entire arbitration agreement
                      in Section 14 shall be null and void. However, all other parts of these Terms will remain in effect.
                    </strong>
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.6 Informal Dispute Resolution</h3>
                  <p className="text-gray-300 mb-4">
                    Before filing an arbitration claim, you agree to first contact us and attempt to resolve the dispute informally.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Send a written notice describing the Dispute to legal@novagenesis.xyz. Include your name,
                    wallet address, a description of the Dispute, and your proposed resolution.
                  </p>
                  <p className="text-gray-300 mb-4">
                    Both parties will have 60 days from receipt of the notice to resolve the Dispute informally.
                    If the Dispute is not resolved within 60 days, either party may initiate arbitration.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.7 Arbitration Award and Enforcement</h3>
                  <p className="text-gray-300 mb-4">
                    The arbitrator&apos;s decision and award will be final and binding, and judgment on the award may be entered
                    in any court of competent jurisdiction.
                  </p>
                  <p className="text-gray-300 mb-4">
                    The arbitrator may award declaratory or injunctive relief only in favor of the individual party seeking relief
                    and only to the extent necessary to provide relief warranted by that party&apos;s individual claim.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.8 Confidentiality</h3>
                  <p className="text-gray-300 mb-4">
                    All aspects of the arbitration proceeding, including the award, shall be strictly confidential,
                    except as required by law or as necessary to enforce or challenge the award.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">14.9 Survival</h3>
                  <p className="text-gray-300">
                    This arbitration agreement will survive the termination of your relationship with Nova.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">15. Severability</h2>
                  <p className="text-gray-300">
                    If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions
                    shall remain in full force and effect.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">16. No Waiver</h2>
                  <p className="text-gray-300">
                    No waiver of any term shall be deemed a further or continuing waiver of such term or any other term.
                    Failure to enforce any right or provision shall not constitute a waiver of such right or provision.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">17. Contact</h2>
                  <p className="text-gray-300 mb-4">
                    For questions about these Terms, contact us at:
                  </p>
                  <p className="text-gray-300">
                    Email: legal@novagenesis.xyz<br />
                    Twitter: @novagenesisxyz
                  </p>
                </section>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mt-8">
                  <p className="text-purple-200 text-sm mb-4">
                    <strong>ACKNOWLEDGMENT:</strong>
                  </p>
                  <p className="text-purple-200 text-sm mb-0">
                    BY USING THE SERVICES, YOU ACKNOWLEDGE THAT YOU HAVE READ, UNDERSTOOD, AND AGREE TO BE BOUND BY THESE TERMS.
                    YOU ACKNOWLEDGE THE RISKS INVOLVED IN USING BLOCKCHAIN TECHNOLOGY AND DIGITAL ASSETS, INCLUDING THE RISK OF TOTAL LOSS.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
