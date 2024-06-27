"use client";
import Image from "next/image";
import { useCardContext } from "@/context/cardContext";
import { MdDelete } from "react-icons/md";
import Link from "next/link";

const CartTable = () => {
  const {
    cart,
    total_amount,
    total_items,
    shipping_fee,
    toggleAmount,
    removeFromCart,
    clearCart,
  } = useCardContext();
  return (
    <div className="w-full p-2">
      <div className="grid xl:grid-cols-7  md:grid-cols-5 grid-cols-4 gap-4 p-4 text-center border-2 rounded-lg">
        <h1>Product</h1>
        <h1>Name</h1>
        <h1>Quantity</h1>
        <h1 className="hidden xl:block">Price</h1>
        <h1 className="hidden xl:block">Discount</h1>
        <h1 className="hidden md:block">Sub Total</h1>
        <h1>Action</h1>

        {cart.map((item) => {
          return (
            <>
              <div key={item.id}>
                <div className="flex justify-center">
                  <img
                    src={item.imageCover}
                    width={100}
                    height={50}
                    alt="productimg"
                  />
                </div>
              </div>
              <div className="flex flex-col xl:text-lg text-sm justify-center items-center font-semibold text-gray-900 dark:text-white ">
                {item.name}
                <div className="xl:hidden block text-xs text-gray-700 text-start p-1">
                  <p>Price: ₹{item.price / 100}</p>
                  <p>Discount: ₹{item.discount / 100}</p>
                  <p>
                    Sub Total: ₹{" "}
                    {((item.price - item.discount) * item.quantity) / 100}{" "}
                  </p>
                </div>
              </div>
              <div className="flex justify-center p-2 font-semibold text-gray-900 dark:text-white ">
                <div className="flex flex-row space-x-2 items-center">
                  <button
                    className="bg-incdec xl:text-3xl text-xl rounded-lg w-10"
                    onClick={() => toggleAmount(item.id, "dec")}
                  >
                    -
                  </button>
                  <h1 className="p-2">{item.quantity}</h1>
                  <button
                    className="bg-incdec xl:text-3xl text-xl rounded-lg w-10"
                    onClick={() => toggleAmount(item.id, "inc")}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="hidden xl:flex justify-center items-center font-semibold text-gray-900 dark:text-white ">
                ₹ {item.price / 100}
              </div>
              <div className="hidden xl:flex justify-center items-center font-semibold text-gray-900 dark:text-white ">
                ₹ {item.discount / 100}
              </div>
              <div className="hidden md:flex justify-center items-center font-semibold text-gray-900 dark:text-white ">
                ₹ {((item.price - item.discount) * item.quantity) / 100}
              </div>
              <div className="flex justify-center items-center font-semibold text-gray-900 dark:text-white ">
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-2xl text-red-600 dark:text-red-500 hover:underline"
                  title="Remove Item"
                >
                  <MdDelete />
                </button>
              </div>
            </>
          );
        })}
      </div>
      <div className="w-full flex flex-row justify-between p-5">
        <Link href={"/shop"} className="bg-blue-800 p-2 rounded-md">
          Continue Shopping
        </Link>
        <button
          onClick={() => clearCart()}
          className="bg-remove p-2 rounded-md"
        >
          Clear Cart
        </button>
      </div>
      <div className="flex flex-col xl:items-end items-center">
        <div className="border-2 border-white w-fit p-5 rounded-xl mt-5 grid grid-cols-2 gap-4 ">
          <p>Total Number of Items :</p> <p> {total_items}</p>
          <p>Shipping fees : </p> <p>₹{shipping_fee / 100}</p>
          <p>Total Amount : </p> <p>₹{(total_amount + shipping_fee) / 100}</p>
        </div>
      </div>
    </div>
  );
};

export default CartTable;
