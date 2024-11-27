import { ethers } from "ethers";
import { bsc, polygon } from "./chains";  // Seus objetos Chain do Thirdweb, você pode configurar conforme necessário
import { Chain } from "thirdweb/chains";

export type NftContract = {
  address: string;
  chain: Chain;
  type: "ERC1155" | "ERC721";
  title?: string;
  description?: string;
  thumbnailUrl?: string;
  slug?: string;
  metadata?: string; // Metadados do NFT (como um JSON ou URL)
};

// Endereços dos contratos de marketplaces (BSC e Polygon)
const bscMarketplaceAddress = "0x73779628D40D91e67e3B221eA42cEaa790143e37";
const polygonMarketplaceAddress = "0x4E455360324C8F0202a6C7159118DC23c0646e8e";

// URL dos RPCs para as redes BSC e Polygon
const bscRpcUrl = "https://bsc-dataseed.binance.org/";
const polygonRpcUrl = "https://polygon-rpc.com/";

// ABI mínimo necessário para interagir com os contratos de marketplaces
const marketplaceAbi = [
  "function getListedNFTs() public view returns (address[] memory)"
];

// ABI mínimo necessário para interagir com os contratos de NFTs (ERC721 ou ERC1155)
const nftAbi = [
  "function name() public view returns (string)",
  "function symbol() public view returns (string)",
  "function tokenURI(uint256 tokenId) public view returns (string)"  // Para pegar o URI dos metadados do NFT
];

async function fetchListedNFTs() {
  // Providers para BSC e Polygon
  const providerBSC = new ethers.JsonRpcProvider(bscRpcUrl);
  const providerPolygon = new ethers.JsonRpcProvider(polygonRpcUrl);

  // Conectando aos contratos de marketplace
  const bscMarketplace = new ethers.Contract(bscMarketplaceAddress, marketplaceAbi, providerBSC);
  const polygonMarketplace = new ethers.Contract(polygonMarketplaceAddress, marketplaceAbi, providerPolygon);

  try {
    // Buscar NFTs listadas no Marketplace BSC
    const bscListedNFTs = await bscMarketplace.getListedNFTs();
    const polygonListedNFTs = await polygonMarketplace.getListedNFTs();

    // Buscar informações sobre os contratos de NFT listados na BSC
    const bscNFTContracts = await Promise.all(
      bscListedNFTs.map(async (nftAddress: string) => {
        const nftContract = new ethers.Contract(nftAddress, nftAbi, providerBSC);
        
        // Nome e símbolo do NFT
        const name = await nftContract.name();
        const symbol = await nftContract.symbol();
        
        // Para pegar o token URI (metadados do NFT)
        const tokenId = 1;  // Como exemplo, usamos o tokenId 1. Isso pode ser ajustado dependendo de como você deseja consultar.
        const tokenURI = await nftContract.tokenURI(tokenId);
        
        // Fetch de metadados (se necessário, a URL pode apontar para um JSON contendo metadados do NFT)
        const metadata = await fetchMetadata(tokenURI);

        return {
          address: nftAddress,
          chain: bsc,
          title: name,
          type: "ERC721",  // Defina o tipo de contrato adequado
          thumbnailUrl: metadata?.image,  // Caso tenha uma imagem no metadado JSON
          metadata,  // Metadados extraídos
        };
      })
    );

    // Buscar informações sobre os contratos de NFT listados na Polygon
    const polygonNFTContracts = await Promise.all(
      polygonListedNFTs.map(async (nftAddress: string) => {
        const nftContract = new ethers.Contract(nftAddress, nftAbi, providerPolygon);
        
        // Nome e símbolo do NFT
        const name = await nftContract.name();
        const symbol = await nftContract.symbol();
        
        // Para pegar o token URI (metadados do NFT)
        const tokenId = 1;  // Como exemplo, usamos o tokenId 1
        const tokenURI = await nftContract.tokenURI(tokenId);
        
        // Fetch de metadados
        const metadata = await fetchMetadata(tokenURI);

        return {
          address: nftAddress,
          chain: polygon,
          title: name,
          type: "ERC721",  // Defina o tipo de contrato adequado
          thumbnailUrl: metadata?.image,  // Imagem do metadado
          metadata,  // Metadados extraídos
        };
      })
    );

    // Retornar todos os contratos de NFTs listados
    return [...bscNFTContracts, ...polygonNFTContracts];
  } catch (error) {
    console.error("Erro ao buscar os NFTs listados", error);
    return [];
  }
}

// Função para buscar os metadados a partir do URI (geralmente JSON no IPFS ou outro serviço)
async function fetchMetadata(tokenURI: string) {
  try {
    const response = await fetch(tokenURI);
    const metadata = await response.json();
    return metadata;
  } catch (error) {
    console.error("Erro ao buscar metadados", error);
    return null;
  }
}

// Chamar a função para buscar os contratos listados e atualizar o estado
export const NFT_CONTRACTS: NftContract[] = [];

fetchListedNFTs().then((contracts) => {
  if (contracts.length > 0) {
    // Atualize o estado ou use os dados conforme necessário
    NFT_CONTRACTS.push(...contracts);
  }
  console.log(NFT_CONTRACTS);
});
