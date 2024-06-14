"use client";
import { useRef, useState } from "react";
import Card from "./product-card";
import { useDrag } from "react-use-gesture";
import { FaAnglesLeft, FaAnglesRight } from "react-icons/fa6";
const products = [
  {
    id: 1,
    name: "Naruto",
    image: "/images/ship.png",
    price: 100,
  },
  {
    id: 2,
    name: "Zoro",
    image: "/images/zoro.png",
    price: 200,
  },
  {
    id: 3,
    name: "One Piece",
    image: "/images/onepiece2.png",
    price: 300,
  },
  {
    id: 1,
    name: "Naruto",
    image: "/images/ship.png",
    price: 100,
  },
  {
    id: 2,
    name: "Zoro",
    image: "/images/zoro.png",
    price: 200,
  },
  {
    id: 3,
    name: "One Piece",
    image: "/images/onepiece2.png",
    price: 300,
  },
  {
    id: 1,
    name: "Naruto",
    image: "/images/ship.png",
    price: 100,
  },
  {
    id: 2,
    name: "Zoro",
    image: "/images/zoro.png",
    price: 200,
  },
  {
    id: 3,
    name: "One Piece",
    image: "/images/onepiece2.png",
    price: 300,
  },
];

const TopProducts = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (scrollOffset: number) => {
    if (scrollContainerRef.current) {
      (scrollContainerRef.current as HTMLDivElement).scrollLeft += scrollOffset;
    }
  };
  const [show, setShow] = useState(false);
  return (
    <div
      className="m-5 bg-gray-900 p-3 rounded-xl space-y-7 "
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <h1 className="text-4xl">Top Products</h1>
      <div className="relative">
        {show && (
          <div>
            <div className="absolute top-1/2 left-0 z-10 text-4xl -translate-y-1/2 backdrop-blur-sm">
              <button
                className="border border-white p-2 rounded-lg ml-2 h-40"
                onClick={() => scroll(-100)}
                title="left"
              >
                <FaAnglesLeft />
              </button>
            </div>
            <div className="absolute top-1/2 right-0 transform -translate-y-1/2 z-10 text-4xl backdrop-blur-sm">
              <button
                className="border border-white p-2 rounded-lg h-40"
                onClick={() => scroll(100)}
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
          {products.map((product) => {
            return <Card key={product.id} {...product} />;
          })}
        </div>
      </div>
    </div>
  );
};
export default TopProducts;
