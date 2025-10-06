import '@/lib/ssr-polyfills';
import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "Nova — The stablecoin where yield funds frontier science",
  description:
    "USDC/USDT keep the yield. Nova directs reserve interest into frontier science in partnership with institutions like USC ISI, with only a minimal portion for compliance and security.",
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "Nova — The stablecoin where yield funds frontier science",
    description:
      "Reserve NOVA with USDC during Genesis. Mint NOGE advisory tokens. Direct stablecoin yield to frontier science research at USC ISI and beyond.",
    url: 'https://nova.money',
    siteName: 'Nova',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Nova - Stablecoin funding frontier science',
      },
      {
        url: '/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'Nova - Stablecoin funding frontier science',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Nova — The stablecoin where yield funds frontier science",
    description:
      "Reserve NOVA with USDC during Genesis. Mint NOGE advisory tokens. Direct stablecoin yield to frontier science research.",
    images: ['/og-image.png'],
    creator: '@novagenesisxyz',
    site: '@novagenesisxyz',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head></head>
      <body className="font-sans">
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
