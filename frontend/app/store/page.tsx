"use client";
import React, { useState } from "react";
import Filter from "@/components/filter";
import Products from "@/components/products";
import { FaFilter } from "react-icons/fa";
import classNames from "classnames";
import { CiGrid41, CiViewList } from "react-icons/ci";
import Sort from "@/components/sort";

const Page = () => {
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [isGrid, setGrid] = useState(true);
  const toggleFilter = () => {
    setFilterVisible(!isFilterVisible);
  };

  return (
    <div className="">
      <div className="flex flex-row justify-between p-6 items-center">
        <div className="lg:hidden">
          <button
            onClick={toggleFilter}
            className="w-fit text-2xl pr-3"
            title="apple"
          >
            <FaFilter />
          </button>
        </div>
        <div className="flex flex-row p-1 text-2xl">
          <CiGrid41
            onClick={() => {
              setGrid(true);
            }}
            className={isGrid ? `bg-white text-black rounded-sm ` : ""}
          />
          <CiViewList
            onClick={() => {
              setGrid(false);
            }}
            className={!isGrid ? `bg-white text-black rounded-sm ` : ""}
          />
        </div>
        <div className="bg-white w-full h-0.5"></div>
        <Sort />
      </div>
      <div className="flex flex-row justify-between">
        <div
          className={classNames(
            "transition-all duration-500 transform absolute lg:relative p-6 ",
            {
              "translate-x-0": isFilterVisible,
              "-translate-x-96 lg:translate-x-0": !isFilterVisible,
              "xl:translate-x-0": true,
            }
          )}
        >
          <Filter />
        </div>

        <div className="w-full">
          <Products grid={isGrid} />
        </div>
      </div>
    </div>
  );
};

export default Page;
