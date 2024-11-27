import type { Metadata } from "next";
import { Providers } from "@/components/shared/Providers";
import { Navbar } from "@/components/shared/Navbar";
import { client } from "@/consts/client"; // Mantém o client, caso ainda precise

export const metadata: Metadata = {
  title: "Marketplace",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{ paddingBottom: "100px" }}>
        <Providers>
          {/* Removido o AutoConnect */}
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
