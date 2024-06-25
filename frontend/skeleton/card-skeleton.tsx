import Skeleton from "react-loading-skeleton";
const CardSkeleton = () => {
  return (
    <div>
      <Skeleton height={200} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
      <Skeleton height={20} />
    </div>
  );
};

export default CardSkeleton;
