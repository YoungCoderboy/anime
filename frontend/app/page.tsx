"use client";
import Image from "next/image";
import { Dancing_Script } from "next/font/google";
import { Suspense, lazy } from "react";
import { useProductContext } from "@/context/productContext";
// const TopProducts = lazy(() => import("@/components/top-products"));
import TopProducts from "@/components/top-products";
const font = Dancing_Script({ subsets: ["latin"] });
const Page = () => {
  const { products_loading, top_products_loading, top_products_error } =
    useProductContext();
  if (products_loading || top_products_loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="flex flex-row space-x-5 items-center justify-between align-center pt-10 p-10">
          <div>
            <h1 className={`${font.className} text-7xl`}>Akihabara Central</h1>
            <p className={`${font.className} text-2xl pt-5 text-wrap`}>
              {` We combine your love of anime with a thriving fan community! Find exclusive merch, connect with fellow otaku, and celebrate the anime world together.`}
            </p>
          </div>
          <div className="hidden md:block">
            <Suspense fallback={<div>Loading...</div>}>
              <Image
                src="/images/onepiece.png"
                alt="apple"
                // classNam e="hidden md:block"
                width="500"
                height="500"
              />
            </Suspense>
          </div>
        </div>
        <div className="flex flex-row space-x-5 items-center justify-between align-center pt-10 p-10">
          <div className="hidden md:block">
            <Suspense
              fallback={<div className="bg-black text-white">Loading...</div>}
            >
              <Image
                src="/images/onepiece2.png"
                alt="apple"
                // classNam e="hidden md:block"
                width="500"
                height="500"
              />
            </Suspense>
          </div>
          <div className="flex flex-col items-center justify-center">
            <h1 className={`${font.className} text-5xl`}>
              What are your waiting for Join us Now !!
            </h1>
            <div className="border-solid border-2 border-sky-500 w-fit p-2 rounded-lg hover:bg-blue-500 hover:text-black mt-10">
              <button className="text-2xl ">Join</button>
            </div>
          </div>
        </div>
      </div>
      {top_products_loading ? (
        <h1>Loading...</h1>
      ) : top_products_error ? (
        <h1>Error</h1>
      ) : (
        <TopProducts />
      )}
    </div>
  );
};

export default Page;
