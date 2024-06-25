import Image from "next/image";
import TableRow from "./table-row";
import { useCardContext } from "@/context/cardContext";

const CartTable = () => {
  const { cart, total_amount, total_items, shipping_fee } = useCardContext();
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg p-3">
      <table className="w-full text-sm text-left rtl:text-right ">
        <thead className="text-md uppercase  ">
          <tr>
            <th scope="col" className="px-16 py-3">
              <span className="sr-only">Image</span>
            </th>
            <th scope="col" className="px-6 py-3 ">
              Product
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Discount
            </th>
            <th scope="col" className="px-6 py-3">
              Sub Total
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item) => {
            return <TableRow key={item.id} item={item} />;
          })}
        </tbody>
      </table>
      <div className="border-2 border-white w-fit p-5 rounded-xl mt-5">
        <pre>Total Number of Items : {total_items}</pre>{" "}
        <pre>Shipping fees : ₹ {shipping_fee / 100}</pre>
        <pre>Total Amount : ₹ {(total_amount + shipping_fee) / 100}</pre>
      </div>
    </div>
  );
};

export default CartTable;
