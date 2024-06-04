const FormInput = ({ label, classes, placeholder }) => {
  return (
    <div className={classes}>
      <label className="block mb-1 font-[Poppins] font-medium text-[14px] leading-[21px]">
        {label}
      </label>
      <input
        type="text"
        className="w-full p-2 rounded-lg bg-[#6268C6] text-white"
        placeholder={placeholder}
      />
    </div>
  );
};

export default FormInput;
