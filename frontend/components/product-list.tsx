import { useCardContext } from "@/context/cardContext";
import { Product_interface } from "@/interface";
import Image from "next/image";
import AddCartBtn from "./addtocart-btn";

const ListCard = ({ product }: { product: Product_interface }) => {
  const { cart } = useCardContext();
  const alreadyInCart = cart.find((item) => item.id === product.id);
  return (
    <div className="flex flex-row border-2 border-solid border-white rounded-lg items-center p-4">
      <div className="border-2 border-solid border-blue-200 min-w-32 min-h-40 rounded-lg max-w-52 p-2">
        <img
          src={product.imageCover}
          alt="apple"
          width="400"
          height="300"
          className="max-h-64 hover:"
        />
      </div>
      <div className="flex flex-col space-y-5 text-white p-3 w-full ">
        <div className="">
          <h1 className="font-bold text-xl">{product.name}</h1>
          <p>₹ {product.price / 100}</p>
        </div>
        <p>
          {product.description?.length <= 500
            ? product.description
            : product.description?.slice(0, 500) + "..."}
        </p>
        <div className="flex flex-row justify-between">
          <button className="bg-blue-700 p-2 rounded-lg border-blue-700 border-solid border-2 hover:border-sky-200 hover:border-solid hover:border-2">
            More Detail
          </button>
          <AddCartBtn
            alreadyInCart={Boolean(alreadyInCart)}
            product={product}
          />
        </div>
      </div>
    </div>
  );
};

export default ListCard;
