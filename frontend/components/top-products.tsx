"use client";
import { useRef, useState } from "react";
import Card from "./product-card";
import { useDrag } from "react-use-gesture";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
import { Dancing_Script } from "next/font/google";
import Link from "next/link";
import { useProductContext } from "@/context/productContext";
const font = Dancing_Script({ subsets: ["latin"] });

const TopProducts = () => {
  const scrollContainerRef = useRef(null);
  const { top_products, top_products_loading } = useProductContext();
  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      (scrollContainerRef.current as HTMLDivElement).scrollLeft += scrollOffset;
    }
  };
  const [show, setShow] = useState(false);
  const [showPage, setShowPage] = useState(false);
  setTimeout(() => {
    setShowPage(true);
  }, 1000);

  if (!showPage) {
    return <div>Loading..</div>;
  }

  return (
    <div
      className="m-5  p-3 rounded-xl space-y-7 "
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <div className="flex flex-row justify-between">
        <h2 className={`text-6xl ${font.className} pl-4`}>Top Products</h2>
        <Link
          href={"/store"}
          className={`text-3xl ${font.className} hover:underline underline-offset-8 underline-thickness-2 underline-blue-400 text-opacity-75`}
        >
          View More
        </Link>
      </div>
      <div className="relative">
        {show && (
          <div>
            <div className="absolute top-1/2 left-0 z-10 text-4xl -translate-y-1/2 backdrop-blur-sm">
              <button
                className="border border-white p-2 rounded-lg ml-2 h-40"
                onClick={() => scroll(-300)}
                title="left"
              >
                <FaAnglesLeft />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-4xl backdrop-blur-sm">
              <button
                className="border border-white p-2 rounded-lg h-40"
                onClick={() => scroll(300)}
                title="right"
              >
                <FaAnglesRight />
              </button>
            </div>
          </div>
        )}
        <div
          ref={scrollContainerRef}
          className="flex flex-row space-x-5 overflow-auto overscroll-x-contain "
        >
          {top_products_loading ? (
            <h1>Loading...</h1>
          ) : (
            top_products.map((product) => {
              return <Card key={product.id} product={product} />;
            })
            // <h1>{JSON.stringify(top_products)}</h1>
          )}
        </div>
      </div>
    </div>
  );
};
export default TopProducts;
