import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { sepolia } from "wagmi/chains";

const projectId =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || "demo_project_id_123456789";

const sepoliaRpc = process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL || "https://rpc.sepolia.org";

export const config = getDefaultConfig({
  appName: "Nova Research Funding",
  projectId,
  chains: [sepolia],
  transports: {
    [sepolia.id]: http(sepoliaRpc),
  },
  ssr: true,
});
