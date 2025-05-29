import React, { useState } from "react";
import { motion } from "framer-motion";

const statuses = ["PENDING", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
const priorities = ["HIGH", "MEDIUM", "LOW"];

const FilterModal = ({ onClose, onApply }) => {
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    category: "",
    date: "",
    assignedTo: "",
    keyword: "",
  });
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const toggleDropdown = (key) => {
    setDropdownOpen(dropdownOpen === key ? null : key);
  };

  const handleDropdownSelect = (key, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[key].includes(value)) {
        updated[key] = updated[key].filter((v) => v !== value);
      } else {
        updated[key] = [...updated[key], value];
      }
      return updated;
    });
  };

  const handleInputChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-2xl rounded-[5px] border border-slate-300 bg-white p-6 shadow-2xl backdrop-blur-sm dark:border-slate-600 dark:bg-[#171717]"
    >
      <h2 className="mb-6 text-center text-2xl font-semibold text-slate-800 dark:text-white">
        Filter Tasks
      </h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="relative">
          <label className="mb-1 text-slate-600 dark:text-slate-300">
            Status
          </label>
          <div
            onClick={() => toggleDropdown("status")}
            className="flex min-h-[45px] cursor-pointer flex-wrap items-center gap-2 rounded-md border bg-slate-50 px-4 py-2 text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            {filters.status.length > 0 ? (
              filters.status.map((status) => (
                <span
                  key={status}
                  className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-700 dark:bg-blue-600 dark:text-white"
                >
                  {status}
                </span>
              ))
            ) : (
              <span className="text-slate-400 dark:text-slate-500">
                Select status...
              </span>
            )}
          </div>
          {dropdownOpen === "status" && (
            <div className="absolute z-30 mt-2 w-full rounded-md border bg-white shadow-lg dark:border-slate-600 dark:bg-[#1f1f1f]">
              {statuses.map((status) => (
                <div
                  key={status}
                  onClick={() => handleDropdownSelect("status", status)}
                  className={`cursor-pointer px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-[#2d2d2d] ${
                    filters.status.includes(status)
                      ? "bg-blue-100 dark:bg-blue-500"
                      : ""
                  }`}
                >
                  {status}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="relative">
          <label className="mb-1 text-slate-600 dark:text-slate-300">
            Priority
          </label>
          <div
            onClick={() => toggleDropdown("priority")}
            className="flex min-h-[45px] cursor-pointer flex-wrap items-center gap-2 rounded-md border bg-slate-50 px-4 py-2 text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
          >
            {filters.priority.length > 0 ? (
              filters.priority.map((priority) => (
                <span
                  key={priority}
                  className="rounded-full bg-yellow-100 px-3 py-1 text-xs text-yellow-700 dark:bg-yellow-600 dark:text-white"
                >
                  {priority}
                </span>
              ))
            ) : (
              <span className="text-slate-400 dark:text-slate-500">
                Select priority...
              </span>
            )}
          </div>
          {dropdownOpen === "priority" && (
            <div className="absolute z-30 mt-2 w-full rounded-md border bg-white shadow-lg dark:border-slate-600 dark:bg-[#1f1f1f]">
              {priorities.map((priority) => (
                <div
                  key={priority}
                  onClick={() => handleDropdownSelect("priority", priority)}
                  className={`cursor-pointer px-4 py-2 text-slate-700 hover:bg-slate-100 dark:text-white dark:hover:bg-[#2d2d2d] ${
                    filters.priority.includes(priority)
                      ? "bg-yellow-100 dark:bg-yellow-500"
                      : ""
                  }`}
                >
                  {priority}
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="mb-1 text-slate-600 dark:text-slate-300">
            Category
          </label>
          <input
            type="text"
            placeholder="e.g. Dev, QA, Design"
            className="w-full rounded-md border bg-slate-50 p-3 text-slate-700 placeholder-slate-400 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
            onChange={(e) => handleInputChange("category", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 text-slate-600 dark:text-slate-300">
            Deadline
          </label>
          <input
            type="date"
            className="w-full rounded-md border bg-slate-50 p-3 text-slate-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            onChange={(e) => handleInputChange("date", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 text-slate-600 dark:text-slate-300">
            Assigned To
          </label>
          <input
            type="text"
            placeholder="e.g. Sharif"
            className="w-full rounded-md border bg-slate-50 p-3 text-slate-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            onChange={(e) => handleInputChange("assignedTo", e.target.value)}
          />
        </div>

        <div>
          <label className="mb-1 text-slate-600 dark:text-slate-300">
            Keyword
          </label>
          <input
            type="text"
            placeholder="Search title..."
            className="w-full rounded-md border bg-slate-50 p-3 text-slate-700 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            onChange={(e) => handleInputChange("keyword", e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <button
          onClick={onClose}
          className="rounded-md border border-slate-300 bg-white px-6 py-2 text-slate-700 hover:bg-slate-100 dark:border-slate-600 dark:bg-[#1f1f1f] dark:text-white dark:hover:bg-[#2d2d2d]"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            onApply(filters);
            onClose();
          }}
          className="rounded-md bg-blue-600 px-6 py-2 font-semibold text-white hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
};

export default FilterModal;
