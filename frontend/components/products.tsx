"use client";
import React, { useState } from "react";
import Card from "./product-card";
import ListCard from "./product-list";

const products = [
  {
    id: 1,
    name: "Product 1",
    price: 100,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 2,
    name: "Product 2",
    price: 200,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 3,
    name: "Product 3",
    price: 300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 4,
    name: "Product 4",
    price: 400,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 5,
    name: "Product 5",
    price: 500,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 6,
    name: "Product 6",
    price: 600,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 7,
    name: "Product 7",
    price: 700,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 8,
    name: "Product 8",
    price: 800,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 9,
    name: "Product 9",
    price: 900,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 10,
    name: "Product 10",
    price: 1000,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 11,
    name: "Product 11",
    price: 1100,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 12,
    name: "Product 12",
    price: 1200,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 13,
    name: "Product 13",
    price: 1300,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 14,
    name: "Product 14",
    price: 1400,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 15,
    name: "Product 15",
    price: 1500,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 16,
    name: "Product 16",
    price: 1600,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 17,
    name: "Product 17",
    price: 1700,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 18,
    name: "Product 18",
    price: 1800,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 19,
    name: "Product 19",
    price: 1900,
    image: "https://via.placeholder.com/150",
  },
  {
    id: 20,
    name: "Product 20",
    price: 2000,
    image: "https://via.placeholder.com/150",
  },
];
interface ProductProps {
  id: number;
  name: string;
  price: number;
  image: string;
}
const Products = ({ grid }: { grid: boolean }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="w-full h-full text-black justify-center">
      {grid ? (
        <div className="p-10 grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 gap-4">
          {currentItems.map((product) => {
            return <Card key={product.id} product={product} />;
          })}
        </div>
      ) : (
        <div className="p-10 space-y-4">
          {currentItems.map((product) => {
            return <ListCard key={product.id} product={product} />;
          })}
        </div>
      )}
      <div className="flex flex-row justify-between p-6">
        <button
          onClick={handlePrev}
          className="text-white border-2 border-blue-200 p-2 rounded-md"
        >
          Previous
        </button>
        <div className="text-white text-xl rounded-full border-2 border-white p-2">
          {currentPage}
        </div>
        <button
          onClick={handleNext}
          className="text-white  border-blue-200 p-2 rounded-md border-2"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Products;
