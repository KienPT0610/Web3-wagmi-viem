import { createPublicClient, createWalletClient, custom, http } from "viem";
import { mainnet, bscTestnet, bsc } from "viem/chains";

export const publicClient = createPublicClient({
  chain: bscTestnet,        // <--- This is the chain that the client will interact with
  transport: http(),
});

let walletClient;
if (typeof window !== 'undefined' && window.ethereum) {
  walletClient = createWalletClient({
    chain: bscTestnet,
    transport: custom(window.ethereum),
  });
} else {
  console.error("Ethereum provider not found. Please install MetaMask or another Ethereum wallet.");
}

export { walletClient };