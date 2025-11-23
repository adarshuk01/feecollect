import React from "react";
import { FaSpinner } from "react-icons/fa";

const Button = ({ 
  text, 
  icon: Icon, 
  onClick, 
  loading = false, 
  type = "button", 
  className = "" 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`flex text-center justify-center items-center gap-2 px-4 py-3 font-semibold rounded-lg transition-colors duration-200 border-b-3 
        ${loading ? "bg-gray-300 cursor-not-allowed text-white border-gray-700" : "bg-primary hover:bg-primary/90 text-white border-blue-900"}
        ${className}
      `}
    >
      {loading ? (
        <FaSpinner className="animate-spin text-white text-lg" />
      ) : (
        Icon && <Icon className="text-white text-lg" />
      )}
      <span>{loading ? text : text}</span>
    </button>
  );
};

export default Button;
