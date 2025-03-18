import React from "react";

const Input = ({ id, name, type = "text", placeholder, value, onChange, autoComplete }) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={autoComplete}
      className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
      required
    />
  );
};

export default Input;
