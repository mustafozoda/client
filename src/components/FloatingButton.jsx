import React from "react";

const FloatingButton = () => {
  return (
    <div className="flex items-center justify-around">
      <button
        className="flex h-[60px] w-[60px] origin-center transform items-center justify-center rounded-full shadow-lg transition-all duration-300 ease-in-out hover:w-[120px] focus:outline-none dark:bg-green-500"
        onClick={() => alert("Button clicked!")}
      >
        <span className="text-2xl">+</span> {/* Icon, for example "+" */}
      </button>
    </div>
  );
};

export default FloatingButton;
