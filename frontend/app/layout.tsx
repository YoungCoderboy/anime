import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/navbar";
import Footer from "@/components/footer";
import TopProducts from "@/components/top-products";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime world",
  description:
    "This is an anime website where you can have chat with other anime lovers and watch anime together. and buy the anime merchandise.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen justify-between">
          <NavBar />
          {/* bg-gradient-to-r from-black via-black to-slate-900 */}
          <div className="bg-black flex-grow">{children}</div>

          <Footer />
        </div>
      </body>
    </html>
  );
}
