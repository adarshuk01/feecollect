import React from "react";

const TextInput = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
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
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full outline-none text-gray-700 "
        />
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default TextInput;
