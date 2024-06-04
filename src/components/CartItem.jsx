import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { FaRegTrashCan } from "react-icons/fa6";

const CartItem = ({ item, increment, decrement, remove }) => {
  const { image, productName, description, quantity, price, id } = item;
  return (
    <div
      className="flex flex-col gap-y-3 sm:flex-row sm:items-center sm:justify-between p-4 border 
      rounded-[15px] mb-6 hover:scale-[1.02] transition-all duration-300 shadow"
    >
      <div className="flex">
        <img src={image} alt={productName} className="w-16 h-16 rounded-md" />
        <div className="mx-4">
          <h2 className="text-lg font-medium font-[poppins] text-[#1E1E1E]">
            {productName}
          </h2>
          <p className="text-[#1E1E1E] font-medium text-[14px] font-[Nunito]">
            {description}
          </p>
        </div>
      </div>

      <div className="flex space-x-8 items-center">
        <span className="text-[22px] font-semibold text-[#393939] font-[Raleway] px-2">
          {quantity}
        </span>
        <div className="flex flex-col items-center">
          <button className="text-[#393939]" onClick={() => increment(id)}>
            <IoIosArrowUp />
          </button>
          <button className="text-[#393939]" onClick={() => decrement(id)}>
            <IoIosArrowDown />
          </button>
        </div>
        <span className="text-[14px] font-medium font-[Poppins] px-3">
          ${(price * quantity).toFixed(2)}
        </span>
        <button className="text-red-600" onClick={() => remove(id)}>
          <FaRegTrashCan />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
