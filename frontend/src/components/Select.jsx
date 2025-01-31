
const SelectComponent = ({options, label, inputChangeHandler , name , value}) => {

  return (
    <div>
      <label htmlFor={label} className="block py-3">
           {label}
          </label>

          <select 
          onChange={inputChangeHandler}
          className="w-full border py-3 px-3" 
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
    </div>
  )
}

export default SelectComponent
