import { mastercard, visa, rupay } from "../assets";
import FormInput from "./FormInput";
import { IoIosArrowRoundForward } from "react-icons/io";

const CartSummary = ({ subtotal, shipping, totalWithTax, handleCheckout }) => {
  return (
    <div className="p-4 bg-[#565ABB] text-white rounded-[20px]">
      <h2 className="text-[22px] font-semibold mb-4 font-[Poppins]">
        Card Details
      </h2>
      <div className="mb-4">
        <label className="block mb-1 font-[Nunito] font-medium">
          Card type
        </label>
        <div className="flex gap-2 flex-wrap items-center">
          <img
            src={mastercard}
            alt="MasterCard"
            className="w-[75px] h-[55px]"
          />
          <img src={visa} alt="Visa" className="w-[75px] h-[55px]" />
          <img src={rupay} alt="RuPay" className="w-[75px] h-[55px]" />
          <a
            href="/"
            className="text-white bg-[#D9D9D933] w-[75px] h-[55px] flex justify-center items-center rounded-[5px]"
          >
            See all
          </a>
        </div>
      </div>
      <FormInput classes="mb-4" label="Name on card" placeholder="Name" />
      <FormInput
        classes="mb-4"
        label="Card Number"
        placeholder="1111 2222 3333 4444"
      />
      <div className="flex flex-col max-sm:space-y-2 sm:flex-row sm:space-x-4 mb-4">
        <FormInput
          classes="flex-1"
          label="Expiration date"
          placeholder="mm/yy"
        />
        <FormInput classes="flex-1" label="CVV" placeholder="123" />
      </div>
      <div className="my-4 font-[Poppins] font-medium text-[14px] leading-[21px]">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping:</span>
          <span>${shipping.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Total (tax incl.):</span>
          <span>${totalWithTax.toFixed(2)}</span>
        </div>
      </div>
      <button
        className="w-full bg-[#4DE1C1] text-white p-3 rounded-xl flex justify-between items-center font-[Poppins] font-medium"
        onClick={handleCheckout}
      >
        ${totalWithTax.toFixed(2)}
        <span className="flex items-center p-1">
          Checkout <IoIosArrowRoundForward className="text-2xl ml-2" />
        </span>
      </button>
    </div>
  );
};

export default CartSummary;
