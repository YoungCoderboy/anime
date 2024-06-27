"use client";

import EmptyCart from "@/components/empty_card";
import CartTable from "@/components/table";
import { useCardContext } from "@/context/cardContext";
import Image from "next/image";

const Page = () => {
  const { cart, toggleAmount } = useCardContext();
  if (cart.length === 0) {
    return <EmptyCart />;
  }

  return <CartTable />;
};

export default Page;
