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

export const RESEARCH_CATEGORIES = [
  "Climate Science",
  "Medical Research",
  "Space Exploration",
  "Quantum Computing",
  "Artificial Intelligence",
  "Renewable Energy",
  "Biotechnology",
  "Materials Science",
  "Ocean Conservation",
  "Agricultural Innovation",
];

export const NOVA_TOKEN_CONFIG = {
  initialSupply: 1000000000,
  mintingRate: 0.02,
  backingRatio: 1.5,
  yieldToResearch: 1.0, // 100% of yields go to research
  governanceThreshold: 10000,
};

import { Token } from "./types";
