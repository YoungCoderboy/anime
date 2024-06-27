"use client";
import { useProductContext } from "@/context/productContext";
import Image from "next/image";
import { useEffect, useState } from "react";
import Star from "@/components/star";
import { useCardContext } from "@/context/cardContext";
import AddCartBtn from "@/components/addtocart-btn";
import Reviews from "@/components/reviews";
import Link from "next/link";

export default function Page({ params }: { params: { id: string } }) {
  const { cart, toggleAmount } = useCardContext();
  const alreadyInCart = cart.find((item) => item.id === params.id);
  const productId = params.id;
  const { fetchSingleProduct, single_product_loading, single_product } =
    useProductContext();

  useEffect(() => {
    fetchSingleProduct(productId);
  }, [productId]);
  const [images, setImages] = useState<string[]>([
    "/images/image.png",
    "/images/image.png",
    "/images/image.png",
    "/images/image.png",
  ]);

  const [coverImg, setCoverImg] = useState<string>("/images/image.png");

  useEffect(() => {
    if (
      single_product.images &&
      single_product.images.length > 0 &&
      single_product.imageCover
    ) {
      const arr = single_product.images;
      arr.push(single_product.imageCover);
      setImages(arr);
    }
    if (single_product.imageCover) {
      setCoverImg(single_product.imageCover);
    }
  }, [single_product]);
  if (single_product_loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
      <div className="flex lg:flex-row lg:space-y-5 flex-col items-center justify-evenly space-x-5 p-5">
        <div className="space-y-3 p-5">
          <div className="border-2 p-5 rounded-xl flex flex-col items-center max-w-fit">
            <img
              width={500}
              height={500}
              src={coverImg}
              alt="ProductID"
              className="rounded-lg min-w-80 max-w-96"
            />
          </div>
          <div className="w-full flex flew-col justify-center">
            <div className="border-2 p-5 rounded-xl flex flex-row space-x-2 max-w-fit items-center">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`${
                    image === coverImg ? "border-2 rounded-lg" : ""
                  }`}
                  onClick={() => setCoverImg(image)}
                >
                  <img
                    width={120}
                    height={200}
                    src={image}
                    alt="ProductID"
                    className={`${
                      image === coverImg ? "opacity-30" : ""
                    } rounded-lg max-w-20 min-w-20`}
                  />
                </div>
              ))}
            </div>
          </div>
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
            {single_product.priceDiscount &&
              single_product.priceDiscount > 0 && (
                <span className="text-discount">
                  -{" "}
                  {(
                    (single_product.priceDiscount / single_product.price) *
                    100
                  ).toFixed(2)}
                  % off
                </span>
              )}

            {single_product.priceDiscount &&
              single_product.priceDiscount > 0 && (
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
            <span>
              {cart.find((item) => item.id === productId)
                ? cart.find((item) => item.id === productId)?.quantity
                : 0}
            </span>
            <button
              className="px-2 py-1 bg-gray-800 rounded"
              onClick={() => toggleAmount(productId, "inc")}
            >
              +
            </button>
          </div>

          {/* {single_product.} */}
          <div className="flex flex-row justify-between">
            <div className="bg-blue-700 rounded-lg p-2">
              <Link href={"/store"} className="w-full h-full">
                Continue Shopping
              </Link>
            </div>
            <div className="max-w-36">
              <AddCartBtn
                alreadyInCart={Boolean(alreadyInCart)}
                product={single_product}
              />
            </div>
          </div>
        </div>
      </div>
      <hr className="" />
      <div className="p-10 overflow-x-auto  flex flex-row">
        {single_product.reviews?.length > 0 ? (
          single_product.reviews.map((review) => (
            <Reviews key={review.id} review={review} />
          ))
        ) : (
          <div className="text-xl p-10 mt-10 flex flex-col items-center ">
            <div className="w-fit border-2 p-5 rounded-lg">
              There are no Reviews
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
