"use client";
import { useProductContext } from "@/context/productContext";
import Image from "next/image";
import { useEffect } from "react";
import Star from "@/components/star";
import { useCardContext } from "@/context/cardContext";
import AddCartBtn from "@/components/addtocart-btn";

export default function Page({ params }: { params: { id: string } }) {
  const { cart, toggleAmount } = useCardContext();
  const alreadyInCart = cart.find((item) => item.id === params.id);
  const productId = params.id;
  const { fetchSingleProduct, single_product_loading, single_product } =
    useProductContext();

  useEffect(() => {
    fetchSingleProduct(productId);
  }, [productId]);

  if (single_product_loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex lg:flex-row lg:space-y-5 flex-col items-center justify-center space-x-5">
      <div>
        <Image
          width={500}
          height={500}
          src={"/images/onepiece.png"}
          alt="ProductID"
        />
      </div>
      <div className="flex flex-col justify-center space-y-5">
        {/* Information */}

        <div>
          <h1 className="text-4xl font-semibold">{single_product.name}</h1>
        </div>
        <div>
          <p className="sm:text-lg text-sm">{single_product.description}</p>
        </div>
        <div className="flex flex-row space-x-1 justify-start pt-2">
          <Star rating={single_product.ratingsAverage} />
          <span className="text-white ">
            ({single_product.ratingsQuantity})
          </span>
        </div>
        <div>
          <p
            className={`text-price ${
              single_product.priceDiscount && single_product.priceDiscount > 0
                ? "line-through text-price/55"
                : ""
            }`}
          >
            M.R.P: ₹ {single_product.price / 100}
          </p>
          {single_product.priceDiscount && single_product.priceDiscount > 0 && (
            <span className="text-discount">
              -{" "}
              {(
                (single_product.priceDiscount / single_product.price) *
                100
              ).toFixed(2)}
              % off
            </span>
          )}

          {single_product.priceDiscount && single_product.priceDiscount > 0 && (
            <p className="text-price">
              Price: ₹{" "}
              {(single_product.price - single_product.priceDiscount) / 100}
            </p>
          )}
        </div>
        {/* <div>
          <p className="text-discount">
            Discount :- ₹
            {single_product.priceDiscount
              ? single_product.priceDiscount / 100
              : 0}
          </p>
        </div> */}
        <div>
          {single_product.stock > 0 ? (
            <p className="text-stock">In Stock</p>
          ) : (
            <p className="text-outStock">Out of Stock</p>
          )}
        </div>
        <div className="flex flex-row space-x-1">
          <span className="font-bold">Brand:</span>
          <p className="font-thin">{single_product.brand}</p>
        </div>

        <hr />
        <div className="flex items-center space-x-5 text-xl">
          <button
            className="px-2 py-1 bg-gray-800 rounded"
            onClick={() => toggleAmount(productId, "dec")}
          >
            -
          </button>
          <span>{cart.find((item) => item.id === productId)?.quantity}</span>
          <button
            className="px-2 py-1 bg-gray-800 rounded"
            onClick={() => toggleAmount(productId, "inc")}
          >
            +
          </button>
        </div>

        {/* {single_product.} */}
        <div className="max-w-28">
          <AddCartBtn
            alreadyInCart={Boolean(alreadyInCart)}
            product={single_product}
          />
        </div>
      </div>
    </div>
  );
}
