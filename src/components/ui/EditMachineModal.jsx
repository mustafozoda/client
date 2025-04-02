import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const EditMachineModal = ({ item, onClose, onSave }) => {
  if (!item) return null;

  // Format "YYYY-MM-DD" from full ISO string
  const formatDate = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    return date.toISOString().split("T")[0];
  };

  // Initial state with correct field names from GET response
  const [formData, setFormData] = useState({
    id: item.id ?? 0,
    description: item.description || "",
    location: item.location || "",
    status: item.status || "OPERATIONAL",
    lastMaintenanceDate: item.lastMaintenanceDate
      ? formatDate(item.lastMaintenanceDate)
      : "",
    nextMaintenanceDate: item.nextMaintenanceDate
      ? formatDate(item.nextMaintenanceDate)
      : "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id ?? 0,
        description: item.description || "",
        location: item.location || "",
        status: item.status || "OPERATIONAL",
        lastMaintenanceDate: item.lastMaintenanceDate
          ? formatDate(item.lastMaintenanceDate)
          : "",
        nextMaintenanceDate: item.nextMaintenanceDate
          ? formatDate(item.nextMaintenanceDate)
          : "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      id: formData.id,
      description: formData.description,
      location: formData.location,
      status: formData.status.toUpperCase(),
      lastMaintenanceDateTime: formData.lastMaintenanceDate
        ? new Date(formData.lastMaintenanceDate).toISOString()
        : null,
      nextMaintenanceDateTime: formData.nextMaintenanceDate
        ? new Date(formData.nextMaintenanceDate).toISOString()
        : null,
    };

    onSave(payload);
    console.log(payload);

    onClose(); // close modal
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
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
          className="absolute right-4 top-4 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
          Edit Machine: {item?.name}
        </h2>

        <div className="rounded-lg bg-gray-100 p-5 shadow-md dark:bg-[#2B2B2B]">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              >
                <option value="OPERATIONAL">OPERATIONAL</option>
                <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
                <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Last Maintenance Date
              </label>
              <input
                type="date"
                name="lastMaintenanceDate"
                value={formData.lastMaintenanceDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Next Maintenance Date
              </label>
              <input
                type="date"
                name="nextMaintenanceDate"
                value={formData.nextMaintenanceDate}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default EditMachineModal;
