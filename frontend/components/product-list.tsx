import { useCardContext } from "@/context/cardContext";
import { Product_interface } from "@/interface";
import Image from "next/image";
import { Poppins } from "next/font/google";
const font = Poppins({ weight: "500", subsets: ["latin"] });
import AddCartBtn from "./addtocart-btn";
import { useRouter } from "next/navigation";
const ListCard = ({ product }: { product: Product_interface }) => {
  const { cart } = useCardContext();
  const router = useRouter();
  const alreadyInCart = cart.find((item) => item.id === product.id);
  const handleProductClick = () => {
    router.push(`/products/${product.id}`);
  };
  return (
    <div className="flex flex-row border-2 border-solid border-white rounded-lg items-center p-4">
      <div
        onClick={handleProductClick}
        className="border-2 border-solid border-blue-200 hover:border-green-500 min-w-32 min-h-40 rounded-lg max-w-52 p-2 cursor-pointer"
      >
        <img
          src={product.imageCover}
          alt="apple"
          width="400"
          height="300"
          className="max-h-64 hover:"
        />
      </div>
      <div className="flex flex-col space-y-6 text-white p-5 w-full ">
        <div className="space-y-2">
          <h1
            className={`font-bold text-xl capitalize font-sans ${font.className}`}
          >
            {product.name}
          </h1>
          <p className="text-price">₹ {product.price / 100}</p>
        </div>
        <p className="hidden sm:block">
          {product.description?.length <= 200
            ? product.description
            : product.description?.slice(0, 200) + "..."}
        </p>
        <div className="flex flex-row justify-between">
          <button className="bg-blue-700 p-2 rounded-lg border-blue-700 border-solid border-2 hover:border-sky-200 hover:border-solid hover:border-2 hidden sm:block">
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
