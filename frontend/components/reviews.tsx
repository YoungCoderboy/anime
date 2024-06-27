import { Review_interface } from "@/interface";
import Image from "next/image";
import Star from "./star";

const Reviews = ({ review }: { review: Review_interface }) => {
  return (
    <div className="flex flex-row p-5 space-x-3 border-2 w-fit rounded-lg">
      <div className="rounded-full border-2 p-1">
        <img
          src={review.userRef.photo || "/images/users/default.png"}
          alt={"User image"}
          className="rounded-full object-cover max-w-24"
        />
      </div>
      <div className="flex flex-col justify-between p-2">
        <div>
          <h1 className="capitalize">{review.userRef.name}</h1>
        </div>
        <div>
          <h1 className="capitalize">{review.comment}</h1>
        </div>
        <div>
          <Star rating={review.rating} />
        </div>
      </div>
    </div>
  );
};

export default Reviews;
