import Image from "next/image";

const Card = ({ ...props }) => {
  return (
    <div className="border-2 border-white border-solid rounded-lg p-10 bg-black flex flex-col justify-between min-w-max">
      <div>
        <Image src={props.image} alt="apple" width="300" height="100" />
      </div>
      <div className="mt-5">
        <h1 className="text-white text-wrap">Name : {props.name}</h1>
        <h1 className="text-white">Price : {props.price}</h1>
      </div>
    </div>
  );
};

export default Card;
