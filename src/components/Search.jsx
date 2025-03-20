import React, { useState, useEffect } from "react";

const Search = () => {
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [recentSearches] = useState([
    "Equipment 1 Searched",
    "Equipment 2 Searched",
    "Equipment 3 Searched",
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
    <div className="relative">
      <input
        type="text"
        placeholder="Search equipment, work orders, & more"
        className={`h-[30px] rounded-md bg-[#FFFFFF] p-[10px] text-black transition-all duration-300 focus:outline-none focus:ring-[1px] focus:ring-black dark:bg-[#212121] dark:focus:ring-[#2B2B2B] ${
          isFocused ? "w-[600px]" : "w-[400px]"
        }`}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      {showDropdown && (
        <div className="absolute left-0 mt-1 w-[600px] rounded-b-md bg-[#a1abae] p-1 shadow-lg dark:bg-[#212121]">
          {recentSearches.length > 0 ? (
            recentSearches.map((item, index) => (
              <div
                key={index}
                className="cursor-pointer rounded-lg p-1 hover:bg-slate-300 dark:hover:bg-[#2B2B2B]"
              >
                {item}
              </div>
            ))
          ) : (
            <div className="p-2">No recent searches</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
