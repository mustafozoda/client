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
import EditMachineModal from "./EditMachineModal"; // Assuming EditMachineModal is in the same directory

const MachineDetails = ({ machine, refetch }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  if (!machine) return null;

  // Mutation to delete machine
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
    },
    onError: (error) => {
      console.error("Error updating machine:", error);
      alert(`Error updating machine: ${error.message}`);
    },
  });

  const handleDelete = () => {
    // Trigger delete machine mutation
    deleteMachineMutation.mutate(machine.id);
  };

  const handleEdit = () => {
    // Open the edit modal
    setIsEditModalOpen(true);
  };

  const handleCloseModal = () => {
    // Close the edit modal
    setIsEditModalOpen(false);
  };

  const handleSave = (updatedMachine) => {
    const formattedMachine = {
      id: updatedMachine.id,
      description: updatedMachine.description,
      lastMaintenanceDateTime: updatedMachine.lastMaintenanceDate,
      nextMaintenanceDateTime: updatedMachine.nextMaintenanceDate,
      location: updatedMachine.location,
      status: updatedMachine.status,
    };

    updateMachineMutation.mutate(formattedMachine);
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
              Last Maintenance: <strong>{machine.lastMaintenanceDate}</strong>
            </span>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
            <CalendarClock size={16} className="text-blue-500" />
            <span>
              Next Maintenance: <strong>{machine.nextMaintenanceDate}</strong>
            </span>
          </div>
        </div>

        <div className="flex flex-row items-end gap-3">
          {/* Edit button */}
          <button
            className="flex items-center"
            onClick={handleEdit} // Open modal on click
          >
            <SquarePen size={20} color="green" />
          </button>

          {/* Delete button */}
          <button
            className="flex items-center"
            onClick={handleDelete} // Delete machine on click
          >
            <Trash2 size={20} color="red" />
          </button>
        </div>
      </motion.div>

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditMachineModal
          item={machine} // Pass machine data to modal
          onClose={handleCloseModal} // Close modal function
          onSave={handleSave} // Save handler
        />
      )}
    </>
  );
};

export default MachineDetails;
