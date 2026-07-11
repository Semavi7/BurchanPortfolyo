export type EvmNetworkKey = "bsc" | "ethereum";

export interface EvmNetworkConfig {
  key: EvmNetworkKey;
  chainIdHex: string;
  chainName: string;
  rpcUrls: string[];
  blockExplorerUrls: string[];
  nativeCurrency: { name: string; symbol: string; decimals: number };
  usdtContract: string;
  usdtDecimals: number;
}

export const evmNetworks: Record<EvmNetworkKey, EvmNetworkConfig> = {
  bsc: {
    key: "bsc",
    chainIdHex: "0x38",
    chainName: "BNB Smart Chain",
    rpcUrls: ["https://bsc-dataseed.binance.org"],
    blockExplorerUrls: ["https://bscscan.com"],
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    usdtContract: "0x55d398326f99059fF775485246999027B3197955",
    usdtDecimals: 18,
  },
  ethereum: {
    key: "ethereum",
    chainIdHex: "0x1",
    chainName: "Ethereum Mainnet",
    rpcUrls: ["https://eth.llamarpc.com"],
    blockExplorerUrls: ["https://etherscan.io"],
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    usdtContract: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    usdtDecimals: 6,
  },
};

const TRANSFER_SELECTOR = "a9059cbb";

const padHex = (hex: string): string => {
  return hex.replace(/^0x/i, "").padStart(64, "0");
};

const toHexAmount = (amount: number, decimals: number): string => {
  const scaled = BigInt(Math.round(amount * 10 ** decimals));
  return scaled.toString(16);
};

export const buildUsdtTransferData = (
  toAdress: string,
  amount: number,
  decimals: number,
): string => {
  const adressPart = padHex(toAdress.toLowerCase());
  const amountPart = padHex(toHexAmount(amount, decimals));
  return `0x${TRANSFER_SELECTOR}${adressPart}${amountPart}`;
};
