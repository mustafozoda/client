import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const EditMachineModal = ({ item, onClose, onSave }) => {
  if (!item) return null;

  const formatDateForInput = (date) => {
    if (!date) return "";
    return new Date(date).toISOString().split("T")[0];
  };

  const [formData, setFormData] = useState({
    id: item.id ?? 0,
    description: item?.description || "",
    location: item?.location || "",
    status: item?.status || "",
    lastMaintenanceDateTime: formatDateForInput(item?.lastMaintenanceDate),
    nextMaintenanceDateTime: formatDateForInput(item?.nextMaintenanceDate),
  });

  useEffect(() => {
    if (item) {
      setFormData({
        id: item.id ?? 0,
        description: item.description || "",
        location: item.location || "",
        status: item.status || "",
        lastMaintenanceDateTime: formatDateForInput(item.lastMaintenanceDate),
        nextMaintenanceDateTime: formatDateForInput(item.nextMaintenanceDate),
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

    const formatDate = (date) => {
      return date ? new Date(date).toISOString() : null;
    };

    const formattedData = {
      ...formData,
      lastMaintenanceDateTime: formatDate(formData.lastMaintenanceDateTime),
      nextMaintenanceDateTime: formatDate(formData.nextMaintenanceDateTime),
    };

    onSave(formattedData);
    console.log(formattedData);

    onClose();
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
          className="absolute right-4 top-4 text-white transition hover:text-gray-800"
        >
          <X size={24} />
        </button>

        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white">
          Edit Machine: {item?.name}
        </h2>

        <div className="rounded-lg bg-gray-100 p-5 shadow-md dark:bg-[#2B2B2B]">
          <form onSubmit={handleSubmit}>
            {/* <div className="mb-4">
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
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              />
            </div> */}

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
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
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
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
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
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              >
                <option value="OPERATIONAL">OPERATIONAL</option>
                <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
                <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
              </select>
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastMaintenanceDateTime"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Last Maintenance
              </label>
              <input
                type="date"
                id="lastMaintenanceDateTime"
                name="lastMaintenanceDateTime"
                value={formData.lastMaintenanceDateTime}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="lastMaintenanceDateTime"
                className="block text-sm font-medium text-gray-600 dark:text-gray-400"
              >
                Next Maintenance
              </label>
              <input
                type="date"
                id="lastMaintenanceDateTime"
                name="lastMaintenanceDateTime"
                value={formData.nextMaintenanceDateTime}
                onChange={handleChange}
                className="mt-2 block w-full rounded-lg border border-gray-300 bg-white p-2 dark:bg-[#333] dark:text-white"
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
