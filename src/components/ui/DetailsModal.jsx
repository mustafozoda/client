import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const DetailsModal = ({ item, onClose }) => {
  const isMachine = item.hasOwnProperty("name"); // Check if it's a machine

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 750 }}
        animate={{ y: 0 }}
        exit={{ y: 750 }}
        transition={{ duration: 0.2 }}
        className="relative w-[40vw] max-w-full rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 transition hover:text-gray-800"
        >
          <X size={24} />
        </button>

        {/* Title */}
        <h2 className="mb-4 text-center text-2xl font-bold">
          {isMachine ? item.name : item.title}
        </h2>

        {/* Details Section */}
        <div className="rounded-lg bg-white p-5 shadow-[0_1px_15px_rgba(0,0,0,0.3)] dark:bg-[#212121]">
          <p className="mb-2">
            <strong>ID:</strong> {item.id}
          </p>
          {isMachine ? (
            <>
              {item.description && (
                <p className="mb-2">
                  <strong>Description:</strong> {item.description}
                </p>
              )}
              {item.status && (
                <p className="mb-2">
                  <strong>Status:</strong> {item.status}
                </p>
              )}
              {item.location && (
                <p className="mb-2">
                  <strong>Location:</strong> {item.location}
                </p>
              )}
              {item.lastMaintenance && (
                <p className="mb-2">
                  <strong>Last Maintenance:</strong> {item.lastMaintenance}
                </p>
              )}
              {item.nextMaintenance && (
                <p className="mb-2">
                  <strong>Next Maintenance:</strong> {item.nextMaintenance}
                </p>
              )}
            </>
          ) : (
            <>
              {item.priority && (
                <p className="mb-2">
                  <strong>Priority:</strong> {item.priority}
                </p>
              )}
              {item.status && (
                <p className="mb-2">
                  <strong>Status:</strong> {item.status}
                </p>
              )}
              {item.dueDate && (
                <p className="mb-2">
                  <strong>Due Date:</strong> {item.dueDate}
                </p>
              )}
              {item.assignedTo && (
                <p className="mb-2">
                  <strong>Assigned To:</strong> {item.assignedTo}
                </p>
              )}
              {item.createdAt && (
                <p className="mb-2">
                  <strong>Created At:</strong> {item.createdAt}
                </p>
              )}
              {item.cost && (
                <p className="">
                  <strong>Cost:</strong> ${item.cost.toFixed(2)}
                </p>
              )}
            </>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="mt-4 w-full rounded-lg bg-[#1976D2] py-3 text-white shadow-lg transition hover:bg-opacity-80"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default DetailsModal;
