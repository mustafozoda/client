import React, { useState, useEffect } from "react";

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches] = useState([
    // "Equipment 1 Searched",
    // "Equipment 2 Searched",
    // "Equipment 3 Searched",
  ]);

  useEffect(() => {
    let timeout;
    if (isFocused) {
      timeout = setTimeout(() => setShowDropdown(true), 1000);
    } else {
      setShowDropdown(false);
    }

    return () => clearTimeout(timeout);
  }, [isFocused]);

  return (
    <div className="relative text-gray-300">
      <input
        type="text"
        placeholder="Search equipment, work orders, & more"
        className={`p-[10px] h-[30px] bg-[#212121] rounded-md transition-all duration-500 focus:outline-none focus:ring-[1px] focus:ring-[#2B2B2B] ${
          isFocused ? "w-[600px]" : "w-[400px]"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {showDropdown && (
        <div className="absolute left-0 mt-1 p-1 w-[600px] bg-[#212121]  rounded-b-md shadow-lg">
          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => (
              <div
                key={index}
                className="p-2 rounded-lg  hover:bg-[#2B2B2B] cursor-pointer"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="p-2 text-gray-500">No recent searches</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
