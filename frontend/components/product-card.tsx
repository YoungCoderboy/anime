import { useCardContext } from "@/context/cardContext";
import { Product_interface } from "@/interface";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddCartBtn from "./addtocart-btn";
const Card = ({ product }: { product: Product_interface }) => {
  const router = useRouter();
  const { addToCart, cart = [] } = useCardContext();

  const alreadyInCart = cart.find((item) => item.id === product.id);

  const handleProductClick = () => {
    router.push(`/products/${product.id}`);
  };
  // console.log("product", product);
  return (
    <div className="border-2 border-white border-solid rounded-lg p-6 bg-slate-950 flex flex-col justify-between items-center min-w-72 min-h-96 space-y-6">
      <div
        onClick={handleProductClick}
        className="cursor-pointer hover:border-green-500   border-white border-solid border-2 max-w-60 min-h-72 p-2 items-center flex rounded-xl bg-gray-900"
      >
        <img
          src={product.imageCover}
          alt={product.name}
          width="200"
          height="200"
          className="max-h-56"
        />
      </div>
      <div className="mt-5 bg-blue-950 min-w-full flex flex-col space-y-3 justify-between items-start p-5 rounded-xl">
        <h1 className="text-white text-wrap font-bold text-lg">
          {product.name}
        </h1>
        <h1 className="text-white">₹ {product.price / 100}</h1>
      </div>
      <div className="w-full">
        <AddCartBtn alreadyInCart={Boolean(alreadyInCart)} product={product} />
      </div>
    </div>
  );
};
//FIXME: If product is already in cart then button should redirected to cart page

export default Card;
