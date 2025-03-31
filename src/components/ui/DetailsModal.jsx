import React from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const DetailsModal = ({ item, onClose }) => {
  const isMachine = item.hasOwnProperty("nextMaintenanceDate");

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
        <button
          onClick={onClose}
          className="absolute right-4 top-4 transition hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="mb-6 text-center text-3xl font-semibold text-[#1976D2]">
          {isMachine ? "Machine Details" : "Task Details"}
        </h2>

        <div className="rounded-lg bg-white p-5 shadow-[0_1px_15px_rgba(0,0,0,0.3)] dark:bg-[#212121]">
          <p className="mb-3 text-lg">
            <strong>ID:</strong> {item.id}
          </p>

          {isMachine ? (
            <>
              <p className="mb-3">
                <strong>Description:</strong> {item.description}
              </p>
              <p className="mb-3">
                <strong>Status:</strong> {item.status}
              </p>
              <p className="mb-3">
                <strong>Location:</strong> {item.location}
              </p>
              <p className="mb-3">
                <strong>Last Maintenance Date:</strong>{" "}
                {new Date(item.lastMaintenanceDate).toLocaleDateString()}
              </p>
              <p className="mb-3">
                <strong>Next Maintenance Date:</strong>{" "}
                {new Date(item.nextMaintenanceDate).toLocaleDateString()}
              </p>
              <p className="mb-3">
                <strong>Date Added:</strong>{" "}
                {new Date(item.dateAdded).toLocaleDateString()}
              </p>
            </>
          ) : (
            <>
              <p className="mb-3">
                <strong>Category:</strong> {item.category}
              </p>
              <p className="mb-3">
                <strong>Priority:</strong> {item.priority}
              </p>
              <p className="mb-3">
                <strong>Status:</strong> {item.status}
              </p>
              <p className="mb-3">
                <strong>Deadline:</strong>{" "}
                {new Date(item.deadline).toLocaleDateString()}
              </p>
              <p className="mb-3">
                <strong>Assigned To:</strong> {item.responsibleUserId || "N/A"}
              </p>
              <p className="mb-3">
                <strong>Created At:</strong>{" "}
                {new Date(item.createDate).toLocaleDateString()}
              </p>
              <p className="mb-3">
                <strong>Cost:</strong> $
                {item.cost ? item.cost.toFixed(2) : "N/A"}
              </p>
            </>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#1976D2] py-3 text-white shadow-lg transition hover:bg-opacity-80"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default DetailsModal;
