import React from "react";

const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  icon: Icon,
  error,
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-gray-600 mb-1" htmlFor={name}>
          {label}
        </label>
      )}

      <div className="flex items-center border bg-gray-50 border-gray-300 rounded-lg px-3 py-3 focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition">
        {Icon && <Icon className="text-gray-400 mr-2" />}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-gray-700"
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default SelectInput;
