import React from "react";

const SearchResultItem = ({ item, onClick }) => {
  return (
    <div
      className="flex w-full cursor-pointer items-center rounded-lg p-2 hover:bg-gray-200 dark:hover:bg-[#2B2B2B]"
      onClick={onClick}
    >
      <div className="w-[90%]">
        <span>Name: {item.taskName || item.name}</span>
      </div>
      <div className="w-[10%]">
        <span>ID: {item.id}</span>
      </div>
    </div>
  );
};

export default SearchResultItem;
