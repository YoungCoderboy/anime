import Image from "next/image";
interface CardProps {
  id: number;
  name: string;
  price: number;
  image: string;
}

const ListCard = ({ product }: { product: CardProps }) => {
  return (
    <div className="flex flex-row border-2 border-solid border-white rounded-lg items-center p-4">
      <div className="border-2 border-solid border-blue-200 min-w-32 min-h-40 rounded-lg">
        <Image
          src={"/images/jjk.png"}
          alt="apple"
          width="400"
          height="300"
          className="max-h-64 hover:"
        />
      </div>
      <div className="flex flex-col space-y-5 text-white justify-center p-3">
        <h1>{product.name}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Id doloribus
          quasi hic numquam, perferendis libero eaque exercitationem vero
          laudantium natus, deleniti repellat unde odio, beatae aspernatur
          corrupti ducimus maiores nesciunt!
        </p>
        <div className="flex flex-row justify-between">
          <h1>$1000</h1>
          <button className="bg-blue-700 p-2 rounded-lg border-blue-700 border-solid border-2 hover:border-sky-200 hover:border-solid hover:border-2">
            Buy Now
          </button>
        </div>
      </div>

      <div>
        <button>Buy</button>
      </div>
    </div>
  );
};

export default ListCard;
