const SelectComponent = ({
  options,
  label,
  inputChangeHandler,
  name,
  value,
}) => {
  return (
    <div className="flex gap-4 items-center my-3 justify-start mx-2">
      <label htmlFor={label}  className="">
        {label}
      </label>

      <div className="relative">
      {/* Select Element */}
      <select
        onChange={inputChangeHandler}
        className="w-full appearance-none bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-4 py-2 pr-10"
        name={name}
        id={label}
        value={value}
      >
        <option value="">Select</option>
        {options.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {/* Dropdown Arrow Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
    </div>
    </div>
  );
};

export default SelectComponent;
