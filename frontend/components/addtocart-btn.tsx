import { useCardContext } from "@/context/cardContext";
import { Product_interface } from "@/interface";
import { useRouter } from "next/navigation";
const AddCartBtn = ({
  alreadyInCart,
  product,
}: {
  alreadyInCart: boolean;
  product: Product_interface;
}) => {
  const router = useRouter();
  const { addToCart } = useCardContext();
  return (
    <div>
      {product.stock === 0 ? (
        <div className="w-full flex flex-col rounded-lg text-lg p-2 bg-gray-600 text-black">
          <button>Out of Stock</button>
        </div>
      ) : (
        <div
          className={`w-full flex flex-col rounded-lg text-lg p-2 bg-blue-400 ${
            alreadyInCart ? "bg-green-500" : "bg-blue-400"
          }`}
        >
          {alreadyInCart ? (
            <button onClick={() => router.push("/cart")}>View Cart</button>
          ) : (
            <button onClick={() => addToCart(product.id, product)}>
              Add to Cart
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default AddCartBtn;
