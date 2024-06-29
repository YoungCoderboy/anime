import { useProductContext } from "@/context/productContext";
import React, { useEffect, useState } from "react";

const CheckList = ({
  checkedBrands,
  setCheckedBrands,
}: {
  checkedBrands: string[];
  setCheckedBrands: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const { brands } = useProductContext();

  const handleCheckChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;
    setCheckedBrands((prev) =>
      checked ? [...prev, name] : prev.filter((brand) => brand !== name)
    );
  };

  return (
    <div>
      {brands.map((brand) => (
        <div key={brand} className="p-1">
          <label className="">
            <input
              type="checkbox"
              name={brand}
              className="mr-2"
              onChange={handleCheckChange}
              checked={checkedBrands.includes(brand)}
            />
            {brand}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckList;
