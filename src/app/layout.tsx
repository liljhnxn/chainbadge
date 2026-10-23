import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "ChainBadge | On-Chain Achievement Registry",
  description:
    "Claim your digital achievement badge recorded immutably on Botchain Mainnet.",
  keywords: ["ChainBadge", "Web3", "Botchain", "Achievement", "Blockchain"],
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-background text-slate-100 antialiased min-h-screen flex flex-col bg-mesh">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
