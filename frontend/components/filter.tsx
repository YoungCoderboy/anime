"use client";

import CheckList from "./checkList";
import { useCardContext } from "@/context/cardContext";
import { useProductContext } from "@/context/productContext";
import { useSearchParams } from "next/navigation";
import { useRouter, usePathname } from "next/navigation";
import { routeHandler } from "@/utils/helper";
import { use, useEffect, useState } from "react";
import Link from "next/link";

const Filter = () => {
  const pathName = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const { category, changeUrl, outOfStock, toggleOutOfStock } =
    useProductContext();
  // get brands and category from url
  const paramCategory = searchParams.get("category");
  const paramBrands = searchParams.getAll("brands");

  const [checkedBrands, setCheckedBrands] = useState<string[]>(paramBrands);
  const [checkedCategory, setCheckedCategory] = useState<string | null>(
    paramCategory
  );

  const [minPrice, setMinPrice] = useState<number>(-1);
  const [maxPrice, setMaxPrice] = useState<number>(-1);
  const [currValue, setCurrValue] = useState<{ min: number; max: number }>({
    min: -1,
    max: -1,
  });

  useEffect(() => {
    const { path, filter_string } = routeHandler(
      pathName,
      checkedCategory,
      [...checkedBrands],
      minPrice,
      maxPrice
    );
    changeUrl(filter_string);
    router.push(path);
  }, [checkedBrands, checkedCategory, minPrice, maxPrice]);

  const handleCategoryClick = (category: string) => {
    setCheckedCategory(category);
  };

  const handleClearFilter = () => {
    setCheckedCategory(null);
    setCheckedBrands([]);
    setMinPrice(-1);
    setMaxPrice(-1);
    if (outOfStock) {
      toggleOutOfStock();
    }
    setCurrValue({ min: -1, max: -1 });
  };

  return (
    <div className="flex flex-col justify-between space-y-11  w-fit backdrop-blur-sm">
      <div className="rounded-xl">
        <input
          type="text"
          placeholder="search product"
          className="p-1 rounded-lg"
        />
      </div>
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold">Category</h2>
        </div>
        <div className="space-y-2 capitalize">
          {category.map((element) => {
            return (
              <div
                key={element}
                onClick={() => handleCategoryClick(element)}
                className={`text-sm cursor-pointer border-2 rounded-lg p-2 ${
                  element === checkedCategory && "text-blue-700"
                }`}
              >
                {element}
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1 className="text-xl font-semibold">Brands</h1>
        <div>
          <CheckList
            setCheckedBrands={setCheckedBrands}
            checkedBrands={checkedBrands}
          />
        </div>
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold">Price</h1>
        <div className="space-y-2">
          <label htmlFor="min">Min :</label>
          <input
            type="number"
            id="min"
            value={currValue.min !== -1 ? currValue.min : ""}
            onChange={(e) => {
              setCurrValue({
                ...currValue,
                min: parseInt(e.currentTarget.value),
              });
            }}
            className="bg-gray-900 rounded-lg p-1"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                // Call your function here
                if (e.currentTarget.value === "") return;
                console.log("Min value entered:", e.currentTarget.value);
                setMinPrice(parseInt(e.currentTarget.value));
              }
            }}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="max">Max :</label>
          <input
            type="number"
            id="max"
            value={currValue.max !== -1 ? currValue.max : ""}
            onChange={(e) => {
              setCurrValue({
                ...currValue,
                max: parseInt(e.currentTarget.value),
              });
            }}
            className="rounded-lg p-1 bg-gray-900"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                if (e.currentTarget.value === "") return;
                // Call your function here
                setMaxPrice(parseInt(e.currentTarget.value));
                console.log("Min value entered:", e.currentTarget.value);
              }
            }}
          />
        </div>
      </div>
      <div
        onClick={toggleOutOfStock}
        className="cursor-pointer bg-blue-700 border-2 p-2 rounded-lg text-black"
      >
        {!outOfStock ? (
          <h1 className="text-lg">Include Out of Stock</h1>
        ) : (
          <h1 className="text-lg">Exclude Out of Stock</h1>
        )}
      </div>
      <div className="space-y-2">
        <button
          onClick={handleClearFilter}
          className="w-full bg-blue-700 p-1 rounded-lg border-2 border-white hover:bg-blue-700 hover:border-blue-500 border-solid"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
