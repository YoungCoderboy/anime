"use client";

import MultiRangeSlider from "./slider";
import CheckList from "./checkList";
import { useCardContext } from "@/context/cardContext";
import { useProductContext } from "@/context/productContext";

const Filter = () => {
  const { category } = useProductContext();
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
            <div key={element} className="text-sm">
              {element}
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
      <div className="space-y-2">
        <button className="w-full bg-blue-700 p-1 rounded-lg border-2 border-white hover:bg-blue-700 hover:border-blue-500 border-solid">
          GO
        </button>
        <button className="w-full bg-blue-700 p-1 rounded-lg border-2 border-white hover:bg-blue-700 hover:border-blue-500 border-solid">
          Clear Filter
        </button>
      </div>
    </div>
  );
};

export default Filter;
