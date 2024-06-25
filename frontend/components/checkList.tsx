import { useProductContext } from "@/context/productContext";
import React, { useState } from "react";

const CheckList: React.FC = () => {
  const [checkedBrands, setCheckedBrands] = useState<string[]>([]);
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
            <input type="checkbox" name={brand} onChange={handleCheckChange} />
            {brand}
          </label>
        </div>
      ))}
      <div>Checked brands: {checkedBrands.join(", ")}</div>
    </div>
  );
};

export default CheckList;
