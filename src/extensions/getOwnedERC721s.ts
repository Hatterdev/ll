import { type BaseTransactionOptions, type NFT, readContract } from "thirdweb";  
import {  
  getNFT,  
  nextTokenIdToMint,  
  ownerOf,  
} from "thirdweb/extensions/erc721";  
  
export type GetERC721sParams = {  
  /**  
  * The address of the wallet to get the NFTs of.  
  */  
  owner: string;  
  
  requestPerSec?: number;  
  start?: number;  
  count?: number;  
};  
  
/**  
 * thirdweb SDK's `getOwnedNFTs` extension only works if your contract has the extension `nextTokenIdToMint`  
 * This custom extension works for the contracts that don't have such method, but `nextTokenId`  
 * It also allow you to set a limit on how many RPC requests should per called per second  
 * @param options  
 * @returns A list of NFTs (type: NFT[])  
 *  
 * @example  
 * // Usage with React  
 * const { data, error } = useReadContract(getOwnedERC721s, {  
 *	 contract,  
 *	 address: "0x...",  
 * });  
 *  
 * // Usage with TypeScript  
 * const nfts = await getOwnedERC721s({  
 *  contract,  
 *  address: "0x...",  
 * });  
 */  
  
export async function getOwnedERC721s(  
  options: BaseTransactionOptions<GetERC721sParams>  
): Promise<NFT[]> {  
  const { contract, owner } = options;  
  const maxId = await Promise.allSettled([  
   readContract({  
    contract: contract,  
    method: "function nextTokenId() view returns (uint256)",  
    params: [],  
   }),  
   nextTokenIdToMint(options),  
  ]).then(([_next, _nextToMint]) => {  
   if (_next.status === "fulfilled") {  
    return _next.value;  
   }  
   if (_nextToMint.status === "fulfilled") {  
    return _nextToMint.value;  
   }  
   throw Error("Contract doesn't have required extension");  
  });  
  const tokenIds: bigint[] = [];  
  for (let i = 0n; i < maxId; i++) {  
   tokenIds.push(i);  
  }  
  
  const owners = await Promise.all(  
   tokenIds.map((tokenId) =>  
    ownerOf({ contract, tokenId }).catch(() => null)  
   )  
  );  
  
  let ownedTokenIds = tokenIds.filter((tokenId, index) => owners[index] === owner);  
  
  if (options.start || options.count) {  
   const start = options?.start || 0;  
   const count = options?.count || 100;  
   ownedTokenIds = ownedTokenIds.slice(start, start + count);  
  }  
  
  const nfts = await Promise.all(  
   ownedTokenIds.map((tokenId) =>  
    getNFT({ ...options, tokenId })  
   )  
  );  
  
  return nfts.map((nft) => ({  
   ...nft,  
   owner,  
  }));  
}
