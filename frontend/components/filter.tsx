"use client";
import { useState } from "react";
import RangeSlider from "./slider";
import MultiRangeSlider from "./slider";
import CheckList from "./checkList";
import { useCardContext } from "@/context/cardContext";

interface Category {
  id: number;
  name: string;
}

const data = [
  {
    id: 1,
    name: "Electronics",
  },
  {
    id: 2,
    name: "Clothing",
  },
  {
    id: 3,
    name: "Shoes",
  },
  {
    id: 4,
    name: "Books",
  },
];

const Filter = () => {
  const [category, setCategory] = useState<Category[]>(data);
  // const {} = useCardContext()
  return (
    <div className="flex flex-col justify-between space-y-11  w-fit backdrop-blur-sm">
      <div className="rounded-xl">
        <input
          type="text"
          placeholder="search product"
          className="p-1 rounded-lg"
        />
      </div>
      <div>
        <div>
          <h2 className="text-xl font-semibold">Category</h2>
        </div>
        {category.map((element) => {
          return (
            <div key={element.id} className="text-sm">
              {element.name}
            </div>
          );
        })}
      </div>
      <div>
        <h1 className="text-xl font-semibold">Brands</h1>
        <div>
          <CheckList />
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
      <div className="bg-blue-700 p-1 rounded-lg border-2 border-white hover:bg-blue-700 hover:border-blue-500 border-solid">
        <button className="w-full">GO</button>
      </div>
    </div>
  );
};

export default Filter;
