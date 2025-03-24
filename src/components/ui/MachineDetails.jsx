import React from "react";
import { motion } from "framer-motion";
import {
  SquarePen,
  Trash2,
  MapPin,
  CalendarCheck,
  CalendarClock,
} from "lucide-react";

const MachineDetails = ({ machine, onEdit, onDelete }) => {
  if (!machine) return null;

  return (
    <motion.div
      className="flex w-full items-start justify-between rounded-lg border border-gray-300 bg-white p-6 shadow-lg dark:border-[#2B2B2B] dark:bg-[#171717]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
    >
      {/* Left Side - Machine Info */}
      <div className="flex w-2/3 flex-col gap-2">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {machine.name}
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-400">
          {machine.description}
        </p>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <MapPin size={16} className="text-gray-500" />
          <span>{machine.location}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <CalendarCheck size={16} className="text-green-500" />
          <span>
            Last Maintenance: <strong>{machine.lastMaintenance}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
          <CalendarClock size={16} className="text-blue-500" />
          <span>
            Next Maintenance: <strong>{machine.nextMaintenance}</strong>
          </span>
        </div>
      </div>

      {/* Right Side - Actions */}
      <div className="flex flex-row items-end gap-3">
        <button
          className="flex items-center"
          onClick={() => onEdit(machine.id)}
        >
          <SquarePen size={20} color="green" />
        </button>
        <button
          className="flex items-center"
          onClick={() => onDelete(machine.id)}
        >
          <Trash2 size={20} color="red" />
        </button>
      </div>
    </motion.div>
  );
};

export default MachineDetails;
