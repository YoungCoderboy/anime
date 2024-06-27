import Link from "next/link";

const EmptyCart = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full space-y-4 mt-5 pt-5">
      <div className="p-32 border-2 rounded-md min-w-48 flex flex-col">
        <h1 className="text-3xl">Cart is empty !!</h1>
        <Link href="/store" className="underline text-gray-400 p-5 mt-4">
          <p className=" font-extralight bg-blue-800 p-2 rounded-md text-center">
            Continue Shopping
          </p>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
