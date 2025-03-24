import React, { useState, useEffect, useRef } from "react";
import { Cpu, FileText, X } from "lucide-react"; // Import X icon
import { motion } from "framer-motion";
import { fetchTasks } from "../api/tasksApi";
import { fetchMachines } from "../api/machinesApi";

import SearchResultItem from "./ui/SearchResultItem";
import DetailsModal from "./ui/DetailsModal";

const Search = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("machines");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false); // Flag to track if delete is in progress

  const searchRef = useRef(null);

  useEffect(() => {
    const storedRecentSearches =
      JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(storedRecentSearches);
  }, []);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const fetchData = async () => {
      const data =
        category === "machines" ? await fetchMachines() : await fetchTasks();
      const filtered = data.filter(
        (item) =>
          item.name?.toLowerCase().includes(query.toLowerCase()) ||
          item.title?.toLowerCase().includes(query.toLowerCase()),
      );
      setResults(filtered.slice(0, 10));
      setShowDropdown(true);
    };

    fetchData();
  }, [query, category]);

  const handleSelect = (item) => {
    setSelectedItem(item);
    const updatedSearches = [
      item,
      ...recentSearches.filter((i) => i.id !== item.id),
    ].slice(0, 6);

    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);
  };
  const dropdownMenuTime = () => {
    setTimeout(() => {
      setShowDropdown(true);
    }, 500);
  };

  const handleDeleteRecent = (id) => {
    setIsDeleting(true); // Set flag to true before deleting
    const updatedSearches = recentSearches.filter((item) => item.id !== id);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);

    // Delay closing dropdown if delete is in progress
    setTimeout(() => {
      setIsDeleting(false); // Reset flag after delete
      if (updatedSearches.length === 0) {
        setShowDropdown(false); // Close dropdown if no more searches
      } else {
        setShowDropdown(true); // Keep dropdown open if there are remaining results
      }
    }, 100); // Small delay to allow for delete action
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target) &&
        !isDeleting
      ) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDeleting]);

  return (
    <div className="relative" ref={searchRef}>
      <div className="relative flex items-center space-x-2">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search equipment, work orders, & more"
            className={`h-[30px] rounded-md bg-[#a1abae] p-[10px] transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 focus:outline-none focus:ring-1 focus:ring-black dark:bg-[#212121] dark:placeholder:text-gray-300 dark:focus:ring-[#2B2B2B] ${
              isFocused || showDropdown ? "w-[600px]" : "w-[400px]"
            }`}
            onFocus={() => {
              setIsFocused(true);
              dropdownMenuTime();
              // setQuery("");
            }}
            onBlur={() =>
              !isDeleting && setTimeout(() => setShowDropdown(false), 200)
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={() =>
              setCategory(category === "machines" ? "tasks" : "machines")
            }
            className="absolute right-0 top-1/2 -translate-y-1/2 transform p-2 text-white"
          >
            {category === "machines" ? <Cpu /> : <FileText />}
          </button>
        </div>
      </div>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 mt-1 w-[600px] rounded-b-md bg-[#a1abae] p-1 shadow-lg dark:bg-[#212121]"
        >
          {results.length > 0 ? (
            results.map((item) => (
              <SearchResultItem
                key={item.id}
                item={item}
                onClick={() => handleSelect(item)}
              />
            ))
          ) : (
            <>
              {recentSearches.length > 0 ? (
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {recentSearches.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item)}
                      className="flex cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-slate-300 dark:hover:bg-[#2B2B2B]"
                    >
                      <span>{item.name || item.title}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteRecent(item.id);
                          setShowDropdown(true);
                        }}
                        className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-400"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-2 text-gray-500 dark:text-gray-400">
                  No recent searches
                </div>
              )}
            </>
          )}
        </motion.div>
      )}

      {selectedItem && (
        <DetailsModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
        />
      )}
    </div>
  );
};

export default Search;
