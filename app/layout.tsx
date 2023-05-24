import Header from "@/components/Header";
import "./globals.css";
import { IBM_Plex_Mono } from "next/font/google";
import Footer from "@/components/Footer";
import Wagmi from "@/context/Wagmi";

const inter = IBM_Plex_Mono({ subsets: ["latin"], weight: ["500"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Wagmi>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
          <Footer />
        </body>
      </html>
    </Wagmi>
  );
}
