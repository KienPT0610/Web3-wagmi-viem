import { createPublicClient, createWalletClient, custom, http } from "viem";
import { mainnet, bscTestnet, bsc } from "viem/chains";

export const publicClient = createPublicClient({
  chain: bscTestnet,        // <--- This is the chain that the client will interact with
  transport: http(),
});

export const walletClient = createWalletClient({
    chain: bscTestnet,
    transport: custom(window.ethereum),
  });

