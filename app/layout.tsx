import Header from "@/components/Header";
import "./globals.css";
import { IBM_Plex_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Wagmi from "@/context/Wagmi";
import { BuyProvider } from "@/context/Buy";
import BuyModal from "@/components/BuyModal";
import { SquidProvider } from "@/context/Squid";

const inter = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata = {
  title: "Squid Hack",
  description: "Buy NFTS cross-chain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wagmi>
      <SquidProvider>
        <BuyProvider>
          <html lang="en">
            <body className={inter.className}>
              <Header />
              <BuyModal />
              <main>{children}</main>
              <Footer />
            </body>
          </html>
        </BuyProvider>
      </SquidProvider>
    </Wagmi>
  );
}
