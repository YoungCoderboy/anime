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
        <div key={brand}>
          <label>
            <input
              type="checkbox"
              name={brand}
              onChange={handleCheckChange}
              checked={checkedBrands.includes(brand)}
            />
            {brand}
          </label>
        </div>
      ))}
      <div>Checked brands: {checkedBrands.join(", ")}</div>
    </div>
  );
};

export default CheckList;
