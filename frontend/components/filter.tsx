"use client";

import MultiRangeSlider from "./slider";
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

  const { category } = useProductContext();
  // get brands and category from url
  const paramCategory = searchParams.get("category");
  const paramBrands = searchParams.getAll("brands");

  const [checkedBrands, setCheckedBrands] = useState<string[]>(paramBrands);
  const [checkedCategory, setCheckedCategory] = useState<string | null>(
    paramCategory
  );

  const [checkedPrice, setCheckedPrice] = useState<{
    min: number;
    max: number;
  }>({} as { min: number; max: number });

  useEffect(() => {
    const path = routeHandler(pathName, checkedCategory, [...checkedBrands]);
    router.push(path);
  }, [checkedBrands, checkedCategory]);

  const handleCategoryClick = (category: string) => {
    setCheckedCategory(category);
  };

  const handleClearFilter = () => {
    setCheckedCategory(null);
    setCheckedBrands([]);
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
      <div>
        <h1 className="text-xl font-semibold">Price</h1>
        <MultiRangeSlider
          min={0}
          max={1000}
          onChange={({ min, max }: { min: number; max: number }) =>
            console.log(`min = ${min}, max = ${max}`)
          }
        />
      </div>
      <div>
        <h1 className="text-lg">Include Out of Stock</h1>
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
