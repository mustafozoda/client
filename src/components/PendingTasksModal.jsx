// components/PendingTasksModal.jsx
import React, { useRef } from "react";
import ReactDOM from "react-dom";
import { Tag, Calendar, Clock, DollarSign, X } from "lucide-react";
import { motion, useScroll } from "framer-motion";

const PendingTasksModal = ({ isOpen, onClose, tasks }) => {
  if (!isOpen) return null;

  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ container: listRef });

  return ReactDOM.createPortal(
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />

      {/* modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-[#a1abae] p-6 shadow-2xl dark:bg-[#212121]"
      >
        <div className="flex w-full items-center justify-between">
          <motion.svg
            width={50}
            height={50}
            viewBox="0 0 100 100"
            className="mb-4"
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              pathLength={1}
              stroke="#374151"
              strokeWidth={8}
              fill="none"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              pathLength={scrollYProgress}
              stroke="#3b82f6"
              strokeWidth={8}
              fill="none"
              style={{ rotate: -90, originX: "50%", originY: "50%" }}
            />
          </motion.svg>

          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
            Pending Tasks ({tasks.length})
          </h2>
          <div></div>

          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
          >
            <X size={24} />
          </button>
        </div>

        {/* task list */}
        <div
          ref={listRef}
          className="hide-scrollbar-p max-h-[40vh] space-y-4 overflow-y-auto pr-2"
        >
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex h-24 w-full items-center justify-between rounded-xl bg-white p-4 text-gray-900 shadow-md dark:bg-[#171717] dark:text-gray-100"
            >
              {/* left: description + category */}
              <div className="flex-1 overflow-hidden">
                <h3 className="truncate text-lg font-semibold">
                  {task.description}
                </h3>
                <div className="mt-1 flex items-center space-x-1 text-sm">
                  <Tag size={16} className="text-gray-500 dark:text-gray-400" />
                  <span className="truncate">{task.category}</span>
                </div>
              </div>

              {/* right: deadline, priority, cost, status */}
              <div className="flex flex-col items-end space-y-1 text-sm">
                <div className="flex items-center space-x-1">
                  <Calendar
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <span>{new Date(task.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <span>{task.priority}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <DollarSign
                    size={16}
                    className="text-gray-500 dark:text-gray-400"
                  />
                  <span>${task.cost}</span>
                </div>
                {/* <span
                  className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    task.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.status}
                </span> */}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </>,
    document.body,
  );
};

export default PendingTasksModal;
