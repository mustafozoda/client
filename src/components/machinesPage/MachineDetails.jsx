import React, { useState } from "react";
import { motion } from "framer-motion";
import { deleteMachine, updateMachine } from "../../api/machinesApi";
import { useMutation } from "@tanstack/react-query";
import {
  SquarePen,
  Trash2,
  MapPin,
  CalendarCheck,
  CalendarClock,
} from "lucide-react";
import EditMachineModal from "./EditMachineModal";

const MachineDetails = ({ machine, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!machine) return null;

  // Format ISO timestamps to YYYY-MM-DD
  const formatDate = (isoString) => {
    if (!isoString) return "-";
    return new Date(isoString).toISOString().split("T")[0];
  };

  const deleteMachineMutation = useMutation({
    mutationFn: (id) => deleteMachine(id),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      console.error("Error deleting machine:", error);
      alert(`Error deleting machine: ${error.message}`);
    },
  });

  const updateMachineMutation = useMutation({
    mutationFn: (data) => updateMachine(data),
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
    },
    onError: (error) => {
      console.error("Error updating machine:", error);
      alert(`Error updating machine: ${error.message}`);
    },
  });

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this machine?")) {
      deleteMachineMutation.mutate(machine.id);
    }
  };

  const handleEdit = () => setIsEditModalOpen(true);
  const handleCloseModal = () => setIsEditModalOpen(false);

  const handleSave = (updatedMachine) => {
    console.log("Updated machine data:", updatedMachine);
    updateMachineMutation.mutate(updatedMachine);
  };

  return (
    <>
      <motion.div
        className="flex w-full items-start justify-between rounded-lg border border-gray-300 bg-white p-6 shadow-lg dark:border-[#2B2B2B] dark:bg-[#171717]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
      >
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
              Last Maintenance:{" "}
              <strong>{formatDate(machine.lastMaintenanceDateTime)}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <CalendarClock size={16} className="text-blue-500" />
            <span>
              Next Maintenance:{" "}
              <strong>{formatDate(machine.nextMaintenanceDateTime)}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-row items-end gap-3">
          <button onClick={handleEdit} className="flex items-center">
            <SquarePen size={20} color="green" />
          </button>

          <button onClick={handleDelete} className="flex items-center">
            <Trash2 size={20} color="red" />
          </button>
        </div>
      </motion.div>

      {isEditModalOpen && (
        <EditMachineModal
          item={machine}
          onClose={handleCloseModal}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default MachineDetails;
