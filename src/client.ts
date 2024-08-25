import { createPublicClient, createWalletClient, custom, http } from "viem";
import { mainnet, bscTestnet, bsc } from "viem/chains";

let transport = null; 
if (typeof window !== 'undefined' && window.ethereum) {
  transport = custom(window.ethereum);
} else {
  transport = http()
}

export const publicClient = createPublicClient({
  chain: bscTestnet,        // <--- This is the chain that the client will interact with
  transport: http(),
});

export const walletClient = createWalletClient({
  chain: bscTestnet,
  transport: transport!,
});