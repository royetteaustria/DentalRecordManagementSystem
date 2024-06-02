const InputField = ({type, placeholder, value, onChange}) => {
  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="border-stroke bg-transparent focus:border-primary active:border-primary disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary w-full rounded border-[1.5px] py-3 px-5 font-medium outline-none transition disabled:cursor-default"
      />
    </>
  );
};

export default InputField;
