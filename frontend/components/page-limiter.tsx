import { useProductContext } from "@/context/productContext";
import React, { useState, useEffect } from "react";

const Limiter = () => {
  const { changeLimit, limit } = useProductContext();
  // Assuming "name-desc" is the value for sorting by name in decreasing order
  const [count, setCount] = useState(limit);
  const productPerPage = [
    { value: "10", label: "10" }, // Added sorting option
    { value: "50", label: "50" },
    { value: "100", label: "100" },
  ];

  const onLimiterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === "") {
      setCount(10);
      return;
    }
    setCount(parseInt(event.target.value));
    changeLimit(parseInt(event.target.value));
  };

  return (
    <div className="text-white bg-black p-1">
      <select
        onChange={onLimiterChange}
        value={count}
        className="bg-black text-white p-1 text-sm rounded-lg border-2"
        title="Sorting Order"
      >
        {productPerPage.map((option) => (
          <option className="bg-black" key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Limiter;
