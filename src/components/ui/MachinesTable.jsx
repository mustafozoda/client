import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "@tanstack/react-query";
import { fetchMachines, deleteMachine } from "../../api/machinesApi";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import MachineDetails from "./MachineDetails";
import useMachineSearchStore from "../../store/useMachineSearchStore";
import DetailsModal from "./DetailsModal";
import EditMachineModal from "./EditMachineModal";

const MachinesTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Manage the Edit Modal state
  const { searchTerm, selectedStatuses } = useMachineSearchStore();

  const {
    data: machines = [],
    isLoading,
    error,
    refetch,
  } = useQuery({ queryKey: ["machines"], queryFn: fetchMachines });

  const deleteMachineMutation = useMutation({
    mutationFn: (id) => deleteMachine(id),
    onSuccess: () => {
      refetch();
    },
    onError: (error) => {
      // alert(`Error deleting machine: ${error.message}`);
    },
  });

  const updateMachineMutation = useMutation({
    mutationFn: (updatedMachine) => updateMachine(updatedMachine),
    onSuccess: () => {
      refetch();
      setIsEditModalOpen(false);
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  const filteredMachines = machines.filter((machine) => {
    const matchesSearch = machine.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase().trim());
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(machine.status);
    return matchesSearch && matchesStatus;
  });

  const handleClick = (machine) => {
    setSelectedMachine(machine);
  };

  const handleDelete = (id) => {
    deleteMachineMutation.mutate(id);
  };

  const handleEdit = (machine) => {
    console.log("Edit button clicked", machine);
    setSelectedMachine(machine); // Set the selected machine for editing
    setIsEditModalOpen(true); // Open the edit modal
    console.log("Modal state is now:", isEditModalOpen); // Check if the state updates correctly
  };

  const closeModal = () => {
    setSelectedMachine(null);
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = (updatedMachine) => {
    updateMachineMutation.mutate(updatedMachine); // Update the machine details
  };
  return (
    <div className="full flex h-[45vh] flex-col space-y-4">
      <div className="hide-scrollbar w-full rounded-lg">
        <div className="flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-10 mb-[10px] grid grid-cols-[7%_32%_30%_20%_10%] bg-white p-3 shadow-md dark:bg-[#171717]">
            <div>ID</div>
            <div>Name</div>
            <div>Location</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

          {/* Machine Rows */}
          <div className="middle flex flex-col gap-[10px]">
            {filteredMachines.length > 0 ? (
              filteredMachines.map((machine) => (
                <React.Fragment key={machine.id}>
                  <motion.div
                    className="grid cursor-pointer grid-cols-[7%_32%_30%_20%_10%] items-center justify-center rounded-[5px] bg-white p-3 dark:border-[#2B2B2B] dark:bg-[#171717]"
                    whileHover={{ scale: 1 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.01 }}
                    onClick={() => handleClick(machine)}
                  >
                    <div className="truncate">{machine.id}</div>

                    <div className="truncate">{machine.name}</div>
                    <div className="truncate">{machine.location}</div>
                    <div
                      className={`truncate font-medium ${
                        machine.status === "Active"
                          ? "text-green-600"
                          : machine.status === "Inactive"
                            ? "text-red-600"
                            : "text-yellow-500"
                      }`}
                    >
                      {machine.status}
                    </div>
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center justify-center"
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setExpandedRow(
                            expandedRow === machine.id ? null : machine.id,
                          );
                        }}
                      >
                        {expandedRow === machine.id ? (
                          <ChevronsDownUp />
                        ) : (
                          <ChevronsUpDown />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Expanded Row */}
                  <AnimatePresence>
                    {expandedRow === machine.id && (
                      <motion.div
                        key={`expanded-${machine.id}`}
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ opacity: 0, y: 0 }}
                        className="p-2"
                      >
                        <MachineDetails
                          machine={machine}
                          onDelete={handleDelete}
                          onEdit={handleEdit}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </React.Fragment>
              ))
            ) : (
              <div className="p-3 text-center text-gray-500">
                No machines found
              </div>
            )}
          </div>
          <div className="sticky bottom-0 z-10 h-[40px] w-full bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.2)] dark:bg-[#171717]"></div>
        </div>
      </div>

      {/* Modal */}
      {selectedMachine && !isEditModalOpen && (
        <DetailsModal item={selectedMachine} onClose={closeModal} />
      )}

      {/* Edit Modal */}
      {/* {isEditModalOpen && selectedMachine && ( */}
      <EditMachineModal
        machine={selectedMachine}
        onClose={closeModal}
        onSave={handleSaveChanges}
      />
      {/* )} */}
    </div>
  );
};

export default MachinesTable;
