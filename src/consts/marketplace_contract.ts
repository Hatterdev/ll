import type { Chain } from "thirdweb";
import {bsc, polygon} from "./chains";

type MarketplaceContract = {
  address: string;
  chain: Chain;
};

/**
 * You need a marketplace contract on each of the chain you want to support
 * Only list one marketplace contract address for each chain
 */
export const MARKETPLACE_CONTRACTS: MarketplaceContract[] = [
  {
    address: "0x73779628D40D91e67e3B221eA42cEaa790143e37",
    chain: bsc,
  },
  {
    address: "0x4E455360324C8F0202a6C7159118DC23c0646e8e",
    chain: polygon,
  },
];
