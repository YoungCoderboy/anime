import Image from "next/image";
interface CardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}
const Card = ({ product }: { product: CardProps }) => {
  return (
    <div className="border-2 border-white border-solid rounded-lg p-6 bg-slate-950 flex flex-col justify-between items-center min-w-72 min-h-96 space-y-6">
      <div className="border-white border-solid border-2 max-w-48 min-h-72 p-5 items-center flex rounded-xl bg-gray-900">
        <Image
          src={"/images/onepiece.png"}
          alt="apple"
          width="200"
          height="200"
          className="max-h-56"
        />
      </div>
      <div className="mt-5 bg-blue-950 min-w-full flex flex-row justify-between items-start p-5 rounded-xl">
        <h1 className="text-white text-wrap font-semibold">{product.name}</h1>
        <h1 className="text-white">${product.price}</h1>
      </div>

      <div className="bg-blue-700 min-w-full flex flex-col rounded-lg text-lg p-2">
        <button>Buy</button>
      </div>
    </div>
  );
};

export default Card;
