import React from "react";

const Label = ({ children, htmlFor }) => {
  return (
    <label htmlFor={htmlFor} className="block text-gray-700 font-medium">
      {children}
    </label>
  );
};

export default Label;
