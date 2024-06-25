import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SiteProvider } from "@/context/siteContext";
import { CardProvider } from "@/context/cardContext";
import { lazy, Suspense } from "react";
import { ProductProvider } from "@/context/productContext";
import React from "react";
const NavBar = React.lazy(() => import("@/components/navbar"));
const Footer = React.lazy(() => import("@/components/footer"));

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Anime world",
  description:
    "This is an anime website where you can have chat with other anime lovers and watch anime together. and buy the anime merchandise.",
};

function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex flex-col h-screen justify-between">
          <Suspense fallback={<div>Loading...</div>}>
            <SiteProvider>
              <ProductProvider>
                <CardProvider>
                  <nav>
                    <NavBar />
                  </nav>
                  <main className="bg-black flex-grow">{children}</main>
                </CardProvider>
              </ProductProvider>
            </SiteProvider>

            <footer>
              <Footer />
            </footer>
          </Suspense>
        </div>
      </body>
    </html>
  );
}
export default Layout;
