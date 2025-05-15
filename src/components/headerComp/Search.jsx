import React, { useState, useEffect, useRef } from "react";
import { Cable, ListTodo, X } from "lucide-react";
import { motion } from "framer-motion";
import { fetchTasks } from "../../api/tasksApi";
import { fetchMachines } from "../../api/machinesApi";
import { History } from "lucide-react";
import SearchResultItem from "./SearchResultItem";
import DetailsModal from "./../machinesPage/DetailsModal";

const Search = () => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("machines");
  const [results, setResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

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
      let data;

      if (category === "machines") {
        data = await fetchMachines();
        data = data.machines || [];
      } else {
        data = await fetchTasks();
        data = data.tasks || [];
      }

      if (Array.isArray(data)) {
        const filtered = data.filter(
          (item) =>
            (item.name?.toLowerCase().includes(query.toLowerCase()) ||
              item.title?.toLowerCase().includes(query.toLowerCase()) ||
              item.description?.toLowerCase().includes(query.toLowerCase()) ||
              item.location?.toLowerCase().includes(query.toLowerCase())) &&
            item.status !== "OUT_OF_SERVICE",
        );
        setResults(filtered.slice(0, 10));
        setShowDropdown(true);
      } else {
        console.error("Data is not an array:", data);
        setResults([]);
      }
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
    setIsDeleting(true);
    const updatedSearches = recentSearches.filter((item) => item.id !== id);
    localStorage.setItem("recentSearches", JSON.stringify(updatedSearches));
    setRecentSearches(updatedSearches);

    setTimeout(() => {
      setIsDeleting(false);
      if (updatedSearches.length === 0) {
        setShowDropdown(false);
      } else {
        setShowDropdown(true);
      }
    }, 100);
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
            className={`h-[30px] ${showDropdown ? "rounded-b-none" : ""} rounded-md bg-[#a1abae] p-[10px] outline-none transition-all duration-300 placeholder:text-black focus:outline-none dark:bg-[#212121] dark:placeholder:text-gray-300 ${
              isFocused || showDropdown ? "w-[40vw]" : "w-[30vw]"
            }`}
            onFocus={() => {
              setIsFocused(true);
              dropdownMenuTime();
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
            {category === "machines" ? <Cable /> : <ListTodo />}
          </button>
        </div>
      </div>

      {showDropdown && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="absolute left-0 flex w-[40vw] flex-col gap-1 rounded-b-md bg-[#a1abae] p-2 dark:bg-[#212121]"
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
                <div className="flex w-full flex-col items-start justify-center gap-2 p-2 text-sm text-gray-600 dark:text-gray-300">
                  <div className="w-full font-semibold text-gray-700 dark:text-gray-400">
                    Recent Searches
                  </div>
                  <div className="flex w-full flex-col items-start justify-center gap-1">
                    {recentSearches.map((item) => (
                      <div
                        key={item.id}
                        onClick={() => handleSelect(item)}
                        className="flex w-full cursor-pointer items-center justify-between rounded-lg p-2 hover:bg-slate-200 dark:hover:bg-[#2B2B2B]"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <History size={15} />
                          <span>{item.description || item.title}</span>
                        </div>
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
