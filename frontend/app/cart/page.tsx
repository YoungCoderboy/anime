"use client";

import CartTable from "@/components/table";
import { useCardContext } from "@/context/cardContext";
import Image from "next/image";

const Page = () => {
  const { cart, toggleAmount } = useCardContext();
  if (cart.length === 0) {
    return <div>Cart is empty</div>;
  }
  console.log(cart);
  //   return (
  //     <div className="grid grid-cols-4 p-10">
  //       {cart.map((item) => {
  //         return (
  //           <div
  //             key={item.id}
  //             className="grid grid-cols-4 gap-72 justify-between items-center"
  //           >
  //             <div>
  //               <Image
  //                 width={100}
  //                 height={100}
  //                 alt={item.id}
  //                 src={"/images/onepiece.png"}
  //               />
  //               <div className="text-xl">
  //                 <h1>{item.name}</h1>
  //               </div>
  //             </div>
  //             <div>
  //               <h1>{item.price / 100}</h1>
  //             </div>
  //             <div className="flex flex-row space-x-2 items-center">
  //               <button
  //                 className="bg-incdec text-3xl p-1 rounded-lg w-10"
  //                 onClick={() => toggleAmount(item.id, "dec")}
  //               >
  //                 -
  //               </button>
  //               <h1 className="p-2">{item.quantity}</h1>
  //               <button
  //                 className="bg-incdec text-3xl p-1 rounded-lg w-10"
  //                 onClick={() => toggleAmount(item.id, "inc")}
  //               >
  //                 +
  //               </button>
  //             </div>
  //             <div>{(item.price * item.quantity) / 100}</div>
  //           </div>
  //         );
  //       })}
  //     </div>
  //   );
  return <CartTable />;
};

export default Page;
