import React, { useState } from "react";

const ToggleSwitch = ({ initial = false, onChange }) => {
  const [isActive, setIsActive] = useState(initial);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (onChange) onChange(newState); // pass updated value to parent
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Label */}
      <span
        className={`text-sm font-medium ${
          isActive ? "text-green-600" : "text-gray-600"
        }`}
      >
        {isActive ? "Active" : "Inactive"}
      </span>

      {/* Toggle */}
      <button
        type="button"
        role="switch"
        aria-checked={isActive}
        onClick={handleToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
          isActive ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isActive ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
};

export default ToggleSwitch;
