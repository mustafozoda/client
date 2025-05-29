import React from "react";
import ReactDOM from "react-dom";
import { motion } from "framer-motion";
import { Tag, Calendar, Clock, DollarSign, X } from "lucide-react";

const PendingTasksModal = ({ isOpen, onClose, tasks }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative z-10 w-full max-w-3xl overflow-hidden rounded-2xl bg-[#a1abae] shadow-2xl dark:bg-[#171717]"
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            Pending Tasks{" "}
            <span className="text-blue-600">({tasks.length})</span>
          </h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 transition hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            <X className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>

        <div className="scrollbar-thin hide-scrollbar scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 max-h-[60vh] space-y-4 overflow-y-auto p-6">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col justify-between rounded-lg bg-gray-50 p-4 transition-shadow hover:shadow-lg dark:bg-[#212121] md:flex-row"
            >
              <div className="flex-1 overflow-hidden">
                <h3 className="truncate text-lg font-medium text-gray-900 dark:text-gray-100">
                  {task.taskName}
                </h3>
                <p className="mt-1 truncate text-sm text-gray-600 dark:text-gray-300">
                  {task.description}
                </p>
                <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <Tag size={16} />
                  <span className="ml-1 truncate">{task.category}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-col items-start space-y-2 text-sm text-gray-700 dark:text-gray-200 md:mt-0 md:items-end">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{new Date(task.deadline).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Clock size={16} className="mr-1" />
                  <span className="uppercase">{task.priority}</span>
                </div>
                <div className="flex items-center">
                  <DollarSign size={16} className="mr-1" />
                  <span>${task.cost}</span>
                </div>
                <span
                  className={`inline-block rounded-sm px-2 py-0.5 text-xs font-semibold ${
                    task.status === "PENDING"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-green-100 text-green-800"
                  }`}
                >
                  {task.status}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-end border-t border-gray-200 px-6 py-4 dark:border-gray-700">
          <button
            onClick={onClose}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </motion.div>
    </div>,
    document.body,
  );
};

export default PendingTasksModal;
