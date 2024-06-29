import { useProductContext } from "@/context/productContext";
import React, { useState, useEffect } from "react";

const Sort = () => {
  const { setSort } = useProductContext();
  // Assuming "name-desc" is the value for sorting by name in decreasing order
  const [sortOrder, setSortOrder] = useState("name");
  const sortingOptions = [
    { value: "name", label: "Name Inc" }, // Added sorting option
    { value: "-name", label: "Name Dec" },
    { value: "ratingAvg", label: "Rating Avg up" },
    { value: "-ratingAvg", label: "Rating Avg down" },
    { value: "price", label: "price up" },
    { value: "-price", label: "price down" },
  ];

  const onSortChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
    setSort(event.target.value);
  };

  return (
    <div className="text-white bg-black">
      <select
        onChange={onSortChangeHandler}
        value={sortOrder}
        className="bg-black text-white p-1 text-sm rounded-lg border-2"
        title="Sorting Order"
      >
        {sortingOptions.map((option) => (
          <option className="bg-black" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {/* <h3>
        Selected Sorting Order:{" "}
        {sortOrder
          ? sortingOptions.find((o) => o.value === sortOrder)?.label
          : "None"}{" "}
      </h3> */}
    </div>
  );
};

export default Sort;
