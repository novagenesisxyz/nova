export const SUPPORTED_TOKENS: Token[] = [
  {
    symbol: "USDC",
    name: "USD Coin",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimals: 6,
    logoUrl: "/tokens/usdc.svg",
  },
  {
    symbol: "DAI",
    name: "Dai Stablecoin",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    decimals: 18,
    logoUrl: "/tokens/dai.svg",
  },
  {
    symbol: "USDT",
    name: "Tether USD",
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    decimals: 6,
    logoUrl: "/tokens/usdt.svg",
  },
  {
    symbol: "NOVA",
    name: "Nova Stablecoin",
    address: "0x0000000000000000000000000000000000000000",
    decimals: 18,
    logoUrl: "/tokens/nova.svg",
  },
];

export const SOCIAL_LINKS = {
  towns: "https://app.towns.com/t/0x786ba3cace901605cb3a10dcbaf74e329a63cdaa/",
  twitter: "https://x.com/novagenesisxyz",
};

export const INITIATIVE_CATEGORIES = [
  "Climate & Environment",
  "Public Health",
  "Open Science & Education",
  "Civic Tech",
  "Digital Public Infrastructure",
  "Open-Source Software",
  "Community & Social Services",
  "Resilience & Disaster Relief",
  "Conservation & Biodiversity",
  "Arts & Culture",
];

export const NOVA_TOKEN_CONFIG = {
  initialSupply: 1000000000,
  mintingRate: 0.02,
  backingRatio: 1.5,
  yieldAllocationPolicy: {
    publicGoodsShare: 0.78, // example default; most yield to public goods
    complianceShare: 0.12,
    securityShare: 0.07,
    opsShare: 0.03,
  },
  governanceThreshold: 10000,
};

import { Token } from "./types";
