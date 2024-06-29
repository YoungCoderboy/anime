"use client";
import React, { useState } from "react";
import Card from "./product-card";
import ListCard from "./product-list";
import { useProductContext } from "@/context/productContext";

const Products = ({ grid }: { grid: boolean }) => {
  const { filter_products, filter_products_loading, filter_products_error } =
    useProductContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filter_products.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filter_products.length / itemsPerPage);
  // TODO: Add Loading and Error Component
  if (filter_products_loading) return <h1>Loading...</h1>;
  if (filter_products_error) return <h1>Error...</h1>;

  if (filter_products.length === 0)
    return (
      <div className="flex flex-col justify-center items-center">
        No Products Found
      </div>
    );

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
