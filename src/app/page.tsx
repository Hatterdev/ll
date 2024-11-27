"use client";

import { Box, Flex, Heading, Text, Button, Image, Stack, useBreakpointValue, Link } from "@chakra-ui/react";
import { FaTelegram, FaInstagram, FaTwitter } from "react-icons/fa"; // Ícones para redes sociais
import { NFT_CONTRACTS } from "@/consts/nft_contracts";

export default function Home() {
  // Usando useBreakpointValue para ajustar a responsividade
  const imageSize = useBreakpointValue({ base: "250px", md: "450px" });
  const fontSizeHeading = useBreakpointValue({ base: "2xl", md: "4xl" });
  const fontSizeText = useBreakpointValue({ base: "lg", md: "2xl" });

  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgImage="url('https://raw.githubusercontent.com/Hatterdev/gicimages/refs/heads/main/94ff0475-56cf-44a0-817e-bf3554299601.jpg')"
        bgSize="cover"
        bgPosition="center"
        height="100vh"
        filter="blur(5px)"
        position="absolute"
        width="100%"
        zIndex="-1"
        opacity="0.7"
      ></Box>

      <Flex
        direction="row-reverse"  // Inverte a direção para colocar a imagem à esquerda
        align="center"
        justify="space-between"
        padding={{ base: "30px", md: "80px 50px" }}
        color="white"
        wrap="wrap"
      >
        {/* Imagem à esquerda */}
        <Box
          position="relative"
          boxSize={imageSize}
          borderRadius="lg"
          overflow="hidden"
          border="5px solid #00FF00"
          boxShadow="0 0 10px rgba(0, 255, 0, 0.3)"
          _hover={{ boxShadow: "0 0 15px rgba(0, 255, 0, 0.5)" }}
        >
          <Image
            src="https://raw.githubusercontent.com/Hatterdev/gicimages/refs/heads/main/f48f8eda-4b8e-4ae3-a2e2-8a17d2a29953.jpg"
            alt="NFT Image"
            objectFit="cover"
            height="100%"
            width="100%"
            borderRadius="lg"
          />
        </Box>

        {/* Texto e Botões do lado direito */}
        <Box maxWidth={{ base: "100%", md: "50%" }} textAlign="left" mb={{ base: "30px", md: "0" }}>
          <Heading fontSize={fontSizeHeading} fontWeight="bold" mb="4">
            Bem-vindo ao Mercado de NFTs
          </Heading>
          <Text fontSize={fontSizeText} mb="6">
            Compre, Venda e Troque NFTs de maneira simples e rápida.
          </Text>

          {/* Botões */}
          <Flex gap="4" direction={{ base: "column", md: "row" }}>
            <Button
              size="lg"
              colorScheme="blue"
              variant="outline"
              borderRadius="full"
              _hover={{
                backgroundColor: "blue.500",
                boxShadow: "0 0 10px 2px rgba(0, 0, 255, 0.7)",
                transform: "scale(1.1)",
              }}
              transition="all 0.3s ease"
            >
              BUY
            </Button>
            <Button
              size="lg"
              colorScheme="blue"
              variant="outline"
              borderRadius="full"
              _hover={{
                backgroundColor: "blue.500",
                boxShadow: "0 0 10px 2px rgba(0, 0, 255, 0.7)",
                transform: "scale(1.1)",
              }}
              transition="all 0.3s ease"
            >
              SELL
            </Button>
            <Button
              size="lg"
              colorScheme="blue"
              variant="outline"
              borderRadius="full"
              _hover={{
                backgroundColor: "blue.500",
                boxShadow: "0 0 10px 2px rgba(0, 0, 255, 0.7)",
                transform: "scale(1.1)",
              }}
              transition="all 0.3s ease"
            >
              TELEGRAM
            </Button>
          </Flex>
        </Box>
      </Flex>

      {/* Faixa de LED verde */}
      <Box
        position="absolute"
        bottom="0"
        width="100%"
        height="10px"
        bgColor="green.500"
        boxShadow="0 0 10px rgba(0, 255, 0, 0.5)"
      ></Box>

      {/* Seção de "Trending Collections" - com fundo */}
      <Box bg="gray.900" py="20px">
        <Heading textAlign="center" fontSize="2xl" color="white" mb="10">
          Trending Collections
        </Heading>

        <Flex
          direction="row"
          wrap="wrap"
          gap="5"
          justifyContent="space-evenly"
        >
          {NFT_CONTRACTS.map((item) => (
            <Link
              _hover={{ textDecoration: "none" }}
              w={300}
              h={400}
              key={item.address}
              href={`/collection/${item.chain.id.toString()}/${item.address}`}
            >
              <Image src={item.thumbnailUrl} />
              <Text fontSize="large" mt="10px" color="white">
                {item.title}
              </Text>
            </Link>
          ))}
        </Flex>
      </Box>

      {/* Footer */}
      <Box
        position="absolute"
        bottom="20px"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        padding={{ base: "0 20px", md: "0 50px" }}
      >
        <Image
          src="https://raw.githubusercontent.com/Hatterdev/gicimages/refs/heads/main/rodape.png"
          alt="Logo"
          boxSize={{ base: "100px", md: "150px" }}
        />
        <Flex gap="6" color="white" fontSize="2xl">
          {/* Links das redes sociais */}
          <Link href="https://x.com/gicsports?s=21" isExternal>
            <FaTwitter size={40} />
          </Link>
          <Link href="https://www.instagram.com/gic_sports?igsh=eXBoZGJ4ODQ1eTdo" isExternal>
            <FaInstagram size={40} />
          </Link>
          <Link href="https://t.me/gicsportsnetwork" isExternal>
            <FaTelegram size={40} />
          </Link>
        </Flex>
      </Box>
    </Box>
  );
}
