"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PrivacyPage() {
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
                Privacy Policy
              </h1>
              <p className="text-gray-400 mb-8">
                Last Updated: October 2025
              </p>

              <div className="prose prose-invert prose-purple max-w-none">

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
                  <p className="text-gray-300 mb-4">
                    Nova (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you use our website and services (collectively, the &ldquo;Services&rdquo;).
                  </p>
                  <p className="text-gray-300">
                    Because Nova operates on public blockchain networks, some information about your transactions is inherently public.
                    This policy explains what additional information we may collect and how we use it.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.1 Blockchain Information (Public)</h3>
                  <p className="text-gray-300 mb-4">
                    When you interact with the Nova protocol smart contracts, the following information is publicly recorded on the
                    Ethereum blockchain: your Ethereum wallet address, transaction amounts and timestamps, NOGE token balances and transfers,
                    governance votes and proposals, and smart contract interactions.
                  </p>
                  <p className="text-gray-300 mb-4">
                    <strong className="text-yellow-300">Important:</strong> Blockchain data is permanent, public, and pseudonymous.
                    We have no control over this data and cannot delete or modify it. Anyone can view transactions associated with your wallet address.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.2 Website Usage Information</h3>
                  <p className="text-gray-300 mb-4">
                    When you visit our website, we may automatically collect IP address and geolocation data, browser type and version,
                    device information (type and operating system), pages visited and time spent on pages, referral source, and clickstream data.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.3 Wallet Connection Information</h3>
                  <p className="text-gray-300 mb-4">
                    When you connect your wallet, we receive your public wallet address and may request permission to view your token balances.
                    We store your wallet address locally in your browser, not on our servers. Third-party wallet providers (MetaMask, WalletConnect,
                    and others) have their own privacy policies that govern their collection and use of your information.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">2.4 Communications</h3>
                  <p className="text-gray-300 mb-4">
                    If you contact us directly, we may collect your email address, name (if provided), message content, and social media handles
                    if you contact us via Twitter, Discord, or other platforms.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
                  <p className="text-gray-300 mb-4">
                    We use collected information to provide, operate, and maintain the Services; improve user experience and website
                    functionality; analyze usage patterns and trends; detect and prevent fraud or abuse; comply with legal obligations;
                    respond to support requests; send important updates about the protocol (if you opt in); and understand geographic
                    distribution of users for regulatory compliance.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">4. Cookies and Tracking Technologies</h2>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.1 Cookies</h3>
                  <p className="text-gray-300 mb-4">
                    We use cookies and similar tracking technologies to remember your wallet connection preferences, analyze website
                    traffic and usage, improve website performance, and personalize your experience. You can control cookies through
                    your browser settings. However, disabling cookies may limit your ability to use certain features.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">4.2 Analytics</h3>
                  <p className="text-gray-300 mb-4">
                    We use third-party analytics services including Vercel Analytics for website performance and usage metrics, and
                    Vercel Speed Insights for page load performance data. These services may collect information about your device,
                    browsing behavior, and interactions with the website. Please review their respective privacy policies for more information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">5. Third-Party Services</h2>
                  <p className="text-gray-300 mb-4">
                    The Services integrate with third-party providers, each with their own privacy practices.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.1 Wallet Providers</h3>
                  <p className="text-gray-300 mb-4">
                    We integrate with wallet providers including MetaMask, Coinbase Wallet, WalletConnect, Rainbow, and others. These
                    providers may collect data about your wallet interactions. You should review their privacy policies before connecting your wallet.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.2 Blockchain Infrastructure</h3>
                  <p className="text-gray-300 mb-4">
                    The Services rely on Ethereum network nodes and RPC providers, as well as Aave protocol smart contracts. These services
                    may log transaction requests and IP addresses when you interact with the blockchain.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">5.3 Communication Platforms</h3>
                  <p className="text-gray-300 mb-4">
                    We may communicate with users through Twitter/X, Discord, Towns, and GitHub. If you interact with us on these platforms,
                    their respective privacy policies apply to any information you share or they collect.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">6. Data Sharing and Disclosure</h2>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">6.1 We Do Not Sell Your Data</h3>
                  <p className="text-gray-300 mb-4">
                    We do not sell, rent, or trade your personal information to third parties for marketing purposes.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">6.2 We May Share Data</h3>
                  <p className="text-gray-300 mb-4">
                    We may share your information with service providers (analytics, hosting, and infrastructure providers who help us
                    operate the Services); for legal compliance (when required by law, court order, or government request); for safety
                    and security purposes (to protect rights, property, or safety of Nova, users, or the public); in connection with
                    business transfers (such as a merger, acquisition, or sale of assets); and with your consent when you explicitly
                    agree to share information.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">6.3 Public Information</h3>
                  <p className="text-gray-300">
                    Remember that blockchain transactions are publicly visible. Anyone can view your wallet address,
                    transaction history, token balances, and governance activities.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">7. Data Retention</h2>
                  <p className="text-gray-300 mb-4">
                    We retain information for as long as necessary to provide the Services, comply with legal obligations, resolve disputes
                    and enforce agreements, and improve the Services. Website analytics data is typically retained for 24-36 months.
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-yellow-300">Note:</strong> Blockchain data is permanent and cannot be deleted.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">8. Data Security</h2>
                  <p className="text-gray-300 mb-4">
                    We implement reasonable security measures to protect your information, including encryption of data in transit (HTTPS/TLS),
                    secure hosting infrastructure, regular security assessments, and access controls and authentication. However, no method of
                    transmission or storage is 100% secure. We cannot guarantee absolute security.
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-yellow-300">Your Responsibility:</strong> You are responsible for securing your wallet private keys.
                    We cannot recover lost keys or reverse unauthorized transactions.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">9. Your Privacy Rights</h2>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">9.1 General Rights</h3>
                  <p className="text-gray-300 mb-4">
                    Depending on your location, you may have the right to access the personal information we hold about you, request
                    correction of inaccurate information, request deletion of your information, object to processing of your information,
                    request data portability, withdraw consent (where processing is based on consent), and opt out of marketing communications.
                  </p>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">9.2 GDPR Rights (EU/EEA Users)</h3>
                  <p className="text-gray-300 mb-4">
                    If you are in the European Union or European Economic Area, you have additional rights under GDPR:
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                    <li>Right to access, rectify, erase, or restrict processing</li>
                    <li>Right to data portability</li>
                    <li>Right to object to processing</li>
                    <li>Right to withdraw consent</li>
                    <li>Right to lodge a complaint with a supervisory authority</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">9.3 CCPA Rights (California Users)</h3>
                  <p className="text-gray-300 mb-4">
                    If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
                  </p>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 ml-4 mb-4">
                    <li>Right to know what personal information is collected</li>
                    <li>Right to know if personal information is sold or disclosed</li>
                    <li>Right to say no to the sale of personal information</li>
                    <li>Right to access your personal information</li>
                    <li>Right to request deletion</li>
                    <li>Right to equal service and price</li>
                  </ul>

                  <h3 className="text-xl font-semibold text-white mb-3 mt-4">9.4 Exercising Your Rights</h3>
                  <p className="text-gray-300 mb-4">
                    To exercise these rights, contact us at privacy@novagenesis.xyz.
                  </p>
                  <p className="text-gray-300">
                    <strong className="text-yellow-300">Blockchain Data Limitation:</strong> We cannot delete, modify, or restrict
                    information recorded on public blockchains. This data is controlled by the blockchain protocol, not by us.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">10. International Data Transfers</h2>
                  <p className="text-gray-300 mb-4">
                    The Services are hosted on infrastructure that may be located in various countries.
                    If you access the Services from outside the United States, your information may be transferred to,
                    stored in, and processed in the United States or other countries.
                  </p>
                  <p className="text-gray-300">
                    By using the Services, you consent to the transfer of your information to countries that may have different
                    data protection laws than your country of residence.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">11. Children&apos;s Privacy</h2>
                  <p className="text-gray-300 mb-4">
                    The Services are not intended for individuals under the age of 18.
                    We do not knowingly collect personal information from children.
                  </p>
                  <p className="text-gray-300">
                    If you believe we have collected information from a child under 18, please contact us immediately,
                    and we will take steps to delete such information.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">12. Do Not Track</h2>
                  <p className="text-gray-300">
                    Some browsers have a &ldquo;Do Not Track&rdquo; feature. We do not currently respond to Do Not Track signals.
                    We treat all users consistently regardless of their Do Not Track settings.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">13. Changes to This Privacy Policy</h2>
                  <p className="text-gray-300 mb-4">
                    We may update this Privacy Policy from time to time. Changes will be effective when posted to this page.
                    We will update the &ldquo;Last Updated&rdquo; date at the top.
                  </p>
                  <p className="text-gray-300">
                    For material changes, we will provide notice through the website or other reasonable means.
                    Continued use of the Services after changes constitutes acceptance of the updated Privacy Policy.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-2xl font-bold text-white mb-4">14. Contact Us</h2>
                  <p className="text-gray-300 mb-4">
                    If you have questions about this Privacy Policy or wish to exercise your privacy rights, contact us at:
                  </p>
                  <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                    <p className="text-gray-300 mb-2">
                      <strong>Email:</strong> privacy@novagenesis.xyz
                    </p>
                    <p className="text-gray-300 mb-2">
                      <strong>Twitter:</strong> @novagenesisxyz
                    </p>
                    <p className="text-gray-300">
                      <strong>Response Time:</strong> We aim to respond to privacy requests within 30 days.
                    </p>
                  </div>
                </section>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6 mt-8">
                  <h3 className="text-lg font-semibold text-purple-200 mb-3">Summary</h3>
                  <ul className="list-disc list-inside text-purple-200 text-sm space-y-2">
                    <li>Blockchain transactions are public and permanent</li>
                    <li>We collect minimal personal information (mostly analytics)</li>
                    <li>We do not sell your data</li>
                    <li>You have rights to access, correct, or delete your data (except blockchain data)</li>
                    <li>Third-party services have their own privacy policies</li>
                    <li>Contact us with privacy questions or concerns</li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6 mt-6">
                  <p className="text-blue-200 text-sm mb-0">
                    <strong>Questions?</strong> We&apos;re committed to transparency about how we handle your information.
                    If anything in this policy is unclear, please reach out and we&apos;ll be happy to explain.
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
