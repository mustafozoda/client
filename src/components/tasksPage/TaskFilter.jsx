import React, { useState } from "react";
import { motion } from "framer-motion";

const TaskFilter = ({ search, setSearch }) => {
  return (
    <motion.div
      // initial={{ opacity: 0, y: -10 }}
      // animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      // transition={{ duration: 0.3 }}
      className="flex w-full justify-end"
    >
      <input
        type="text"
        placeholder="Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="right-0 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-800 placeholder-slate-400 shadow-sm outline-none dark:border-slate-600 dark:bg-[#212121] dark:text-white dark:placeholder-slate-500"
      />
    </motion.div>
  );
};

export default TaskFilter;
