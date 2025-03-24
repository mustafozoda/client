import React from "react";

const SearchResultItem = ({ item, onClick }) => {
  return (
    <div
      className="cursor-pointer border-b p-2 hover:bg-gray-300 dark:hover:bg-[#2B2B2B]"
      onClick={onClick}
    >
      <p className="font-semibold">{item.name || item.title}</p>
      <p className="text-sm text-gray-600">{item.id}</p>
    </div>
  );
};

export default SearchResultItem;
