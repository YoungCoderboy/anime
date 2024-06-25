import { useCardContext } from "@/context/cardContext";
import { CartInterface } from "@/interface";
import Image from "next/image";

const TableRow = ({ item }: { item: CartInterface }) => {
  const { toggleAmount, removeFromCart } = useCardContext();
  return (
    <tr className="border-b border-t ">
      <td className="p-4">
        <Image
          src={"/images/onepiece.png"}
          width={100}
          height={50}
          alt="productimg"
        />
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white ">
        {item.name}
      </td>
      <td className="px-6 py-4">
        <div className="flex flex-row space-x-2 items-center">
          <button
            className="bg-incdec text-3xl rounded-lg w-10"
            onClick={() => toggleAmount(item.id, "dec")}
          >
            -
          </button>
          <h1 className="p-2">{item.quantity}</h1>
          <button
            className="bg-incdec text-3xl rounded-lg w-10"
            onClick={() => toggleAmount(item.id, "inc")}
          >
            +
          </button>
        </div>
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ₹ {item.price / 100}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ₹ {item.discount / 100}
      </td>
      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
        ₹ {((item.price - item.discount) * item.quantity) / 100}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => removeFromCart(item.id)}
          className="font-medium text-red-600 dark:text-red-500 hover:underline"
        >
          Remove
        </button>
      </td>
    </tr>
  );
};

export default TableRow;
