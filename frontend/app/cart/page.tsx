"use client";

import CartTable from "@/components/table";
import { useCardContext } from "@/context/cardContext";
import Image from "next/image";

const Page = () => {
  const { cart, toggleAmount } = useCardContext();
  if (cart.length === 0) {
    return <div>Cart is empty</div>;
  }

  return <CartTable />;
};

export default Page;
