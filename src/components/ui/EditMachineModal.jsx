import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const EditMachineModal = ({ item, onClose, onSave }) => {
  if (!item) return null;

  const [formData, setFormData] = useState({
    name: item?.name || "",
    description: item?.description || "",
    location: item?.location || "",
    status: item?.status || "",
    lastMaintenance: item?.lastMaintenance || "",
    nextMaintenance: item?.nextMaintenance || "",
  });

  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name || "",
        description: item.description || "",
        location: item.location || "",
        status: item.status || "",
        lastMaintenance: item.lastMaintenance || "",
        nextMaintenance: item.nextMaintenance || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex h-screen w-full items-center justify-center"
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

        <h2 className="mb-4 text-center text-2xl font-bold text-white">
          Edit Machine: {item}
        </h2>

        <div className="rounded-lg bg-white p-5 shadow-[0_1px_15px_rgba(0,0,0,0.3)] dark:bg-[#212121]">
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastMaintenance"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Last Maintenance
              </label>
              <input
                type="date"
                id="lastMaintenance"
                name="lastMaintenance"
                value={formData.lastMaintenance}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="nextMaintenance"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Next Maintenance
              </label>
              <input
                type="date"
                id="nextMaintenance"
                name="nextMaintenance"
                value={formData.nextMaintenance}
                onChange={handleChange}
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-full rounded-lg bg-[#1976D2] py-3 text-white shadow-lg transition hover:bg-opacity-80"
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
