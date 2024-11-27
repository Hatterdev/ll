import { defineChain } from "thirdweb";

/**
 * Definir a rede Binance Smart Chain (BSC)
 */
export const bsc = defineChain({
  id: 56, // ID da BSC
  rpc: "https://bsc-dataseed.binance.org/", // RPC oficial da BSC
  nativeCurrency: {
    name: "BNB", // Nome da moeda nativa da BSC
    symbol: "BNB", // Símbolo da moeda
    decimals: 18, // Decimais da moeda
  },
  blockExplorers: [
    {
      name: "BscScan", // Nome do explorador
      url: "https://bscscan.com", // URL do explorador de blocos da BSC
    },
  ],
  name: "Binance Smart Chain", // Nome da rede
});

/**
 * Definir a rede Polygon
 */
export const polygon = defineChain({
  id: 137, // ID da Polygon
  rpc: "https://polygon-rpc.com/", // RPC oficial da Polygon
  nativeCurrency: {
    name: "MATIC", // Nome da moeda nativa da Polygon
    symbol: "MATIC", // Símbolo da moeda
    decimals: 18, // Decimais da moeda
  },
  blockExplorers: [
    {
      name: "PolygonScan", // Nome do explorador
      url: "https://polygonscan.com", // URL do explorador de blocos da Polygon
    },
  ],
  name: "Polygon", // Nome da rede
});
