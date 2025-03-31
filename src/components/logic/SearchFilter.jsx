import React, { useState, useEffect } from "react";
import useMachineSearchStore from "../../store/useMachineSearchStore";

const statuses = ["OPERATIONAL", "OUT_OF_SERVICE", "UNDER_MAINTENANCE"];

const SearchFilter = () => {
  const { searchTerm, selectedStatuses, setSearchTerm, setSelectedStatuses } =
    useMachineSearchStore();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusToggle = (status) => {
    setSelectedStatuses((prev) => {
      const safePrev = Array.isArray(prev) ? prev : [];
      return safePrev.includes(status)
        ? safePrev.filter((s) => s !== status)
        : [...safePrev, status];
    });
  };

  useEffect(() => {
    // console.log("Updated Selected Statuses:", selectedStatuses);
  }, [selectedStatuses]);

  const toggleDropdown = () => {
    setDropdownOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#status-dropdown-wrapper")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex w-full items-center justify-center gap-2 rounded-md">
      <div className="w-[60%]">
        <input
          type="text"
          placeholder="Search Machine"
          value={searchTerm}
          onChange={handleSearchChange}
          className="h-[35px] w-full truncate rounded-[5px] border bg-white p-2 focus:outline-none dark:border-gray-700 dark:bg-[#212121] dark:placeholder:text-gray-300"
        />
      </div>

      <div id="status-dropdown-wrapper" className="relative w-[40%]">
        <div
          className="flex min-h-[35px] w-full cursor-pointer items-center gap-1 truncate rounded-md border bg-white px-2 dark:border-gray-700 dark:bg-[#212121]"
          onClick={toggleDropdown}
        >
          {selectedStatuses.length > 0 ? (
            selectedStatuses.map((status) => (
              <span
                key={status}
                className="rounded-md bg-gray-200 px-2 py-0.5 text-sm text-gray-800 dark:bg-[#171717] dark:text-white"
              >
                {status}
              </span>
            ))
          ) : (
            <span className="text-gray-500 dark:text-gray-300">
              Select Status
            </span>
          )}
        </div>

        {dropdownOpen && (
          <div
            id="status-dropdown"
            className="absolute left-0 z-20 mt-1 w-full rounded-md border bg-white shadow-md dark:border-gray-700 dark:bg-[#2B2B2B]"
          >
            {statuses.map((status) => (
              <div
                key={status}
                onClick={() => handleStatusToggle(status)}
                className={`cursor-pointer px-3 py-2 text-sm ${
                  selectedStatuses.includes(status)
                    ? "bg-gray-300 dark:bg-gray-600"
                    : "hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {status}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
