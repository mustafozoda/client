import React from "react";

const Checkbox = ({ id, label, checked, onChange }) => {
  return (
    <label htmlFor={id} className="flex items-center space-x-2 cursor-pointer">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 accent-blue-600"
      />
      <span className="text-gray-700">{label}</span>
    </label>
  );
};

export default Checkbox;
