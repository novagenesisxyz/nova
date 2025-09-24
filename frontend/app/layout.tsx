import '@/lib/ssr-polyfills';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nova — The stablecoin where yield funds frontier science",
  description:
    "USDC/USDT keep the yield. Nova directs reserve interest into frontier science in partnership with institutions like USC ISI, with only a minimal portion for compliance and security.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col bg-black">
            <div className="flex-1 flex flex-col">
              {children}
            </div>
          </div>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
