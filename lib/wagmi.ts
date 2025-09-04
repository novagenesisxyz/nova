import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, polygon, optimism, arbitrum, base } from "wagmi/chains";

export const config = getDefaultConfig({
  appName: "Nova Research Funding",
  projectId: "demo_project_id_123456789", // Demo project ID for development
  chains: [mainnet, polygon, optimism, arbitrum, base],
  ssr: true,
});
