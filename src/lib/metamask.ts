"use client";

import {
  buildUsdtTransferData,
  EvmNetworkKey,
  evmNetworks,
} from "./evm-payment";

declare global {
  interface Window {
    ethereum?: {
      request: (args: {
        method: string;
        params?: unknown[];
      }) => Promise<unknown>;
      isMateMask?: boolean;
    };
  }
}

export const isMetaMaskAvailable = (): boolean => {
  return typeof window !== "undefined" && Boolean(window.ethereum);
};

export const connectWallet = async (): Promise<string> => {
  if (!window.ethereum) throw new Error("MATEMASK_NOT_FOUND");
  const accont = (await window.ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];
  if (!accont || accont.length === 0) throw new Error("NO_ACCOUNT");
  return accont[0];
};

export const ensureNetwork = async (
  networkKey: EvmNetworkKey,
): Promise<void> => {
  if (!window.ethereum) throw new Error("MATEMASK_NOT_FOUND");
  const net = evmNetworks[networkKey];
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: net.chainIdHex }],
    });
  } catch (err: unknown) {
    const code = (err as { code?: number })?.code;
    if (code === 4902) {
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: net.chainIdHex,
            chainName: net.chainName,
            rpcUrls: net.rpcUrls,
            blockExplorerUrls: net.blockExplorerUrls,
            nativeCurrency: net.nativeCurrency,
          },
        ],
      });
    } else {
      throw err;
    }
  }
};

export const sendUsdtPayment = async (params: {
  fromAdress: string;
  toAdress: string;
  amount: number;
  networkKey: EvmNetworkKey;
}): Promise<string> => {
  if (!window.ethereum) throw new Error("MATEMASK_NOT_FOUND");
  const net = evmNetworks[params.networkKey];
  const data = buildUsdtTransferData(
    params.toAdress,
    params.amount,
    net.usdtDecimals,
  );

  const txHash = (await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        from: params.fromAdress,
        to: net.usdtContract,
        data,
      },
    ],
  })) as string;

  return txHash;
};
