"use client";

import { useCardContext } from "@/context/cardContext";

const Page = () => {
  const { cart, toggleAmount } = useCardContext();
  if (cart.length === 0) {
    return <div>Cart is empty</div>;
  }
  return (
    <div>
      {cart.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.id}</h1>
            <button onClick={() => toggleAmount(item.id, "inc")}>+</button>
            <button onClick={() => toggleAmount(item.id, "dec")}>-</button>
          </div>
        );
      })}
    </div>
  );
};

export default Page;
