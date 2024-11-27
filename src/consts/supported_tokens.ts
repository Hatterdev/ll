import type { Chain } from "thirdweb";
import {bsc, polygon} from "./chains";

export type Token = {
  tokenAddress: string;
  symbol: string;
  icon: string;
};

export type SupportedTokens = {
  chain: Chain;
  tokens: Token[];
};

/**
 * By default you create listings with the payment currency in the native token of the network (eth, avax, matic etc.)
 *
 * If you want to allow users to transact using different ERC20 tokens, you can add them to the config below
 * Keep in mind this is for front-end usage. Make sure your marketplace v3 contracts accept the ERC20s
 * check that in https://thirdweb.com/<chain-id>/<marketplace-v3-address>/permissions -> Asset
 * By default the Marketplace V3 contract supports any asset (token)
 */
export const SUPPORTED_TOKENS: SupportedTokens[] = [
  {
    chain: bsc,
    tokens: [
      {
        tokenAddress: "0x55d398326f99059fF775485246999027B3197955",
        symbol: "USDT",
        icon: "/erc20-icons/usdt.png",
      },
      {
        tokenAddress: "0x248430019224E4479588B3161aF49ee44155D450",
        symbol: "GIC ",
        icon: "/erc20-icons/GIC.png",
      },
      // Add more ERC20 here...
    ],
  },

  {
    chain: polygon,
    tokens: [
      {
        tokenAddress: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
        symbol: "USDC",
        icon: "/erc20-icons/usdc.png",
      },
     
    ],
  },


];

export const NATIVE_TOKEN_ICON_MAP: { [key in Chain["id"]]: string } = {
  1: "/native-token-icons/eth.png",
  [bsc.id]: "/native-token-icons/eth.png",
  [polygon.id]: "/native-token-icons/matic.png",
};
