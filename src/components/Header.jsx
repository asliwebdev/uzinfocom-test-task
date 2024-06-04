import { IoIosArrowBack } from "react-icons/io";

const Header = () => {
  return (
    <header className="flex items-center py-4 bg-white border-b-[2px] border-[#D0CFCF]">
      <a
        href="/"
        className="flex items-center text-lg font-semibold font-[poppins]"
      >
        <IoIosArrowBack />
        <span className="ml-2">Shopping Continue</span>
      </a>
    </header>
  );
};

export default Header;
