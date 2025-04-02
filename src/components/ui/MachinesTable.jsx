import React, { useState, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMachines } from "../../api/machinesApi";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import MachineDetails from "./MachineDetails";
import useMachineSearchStore from "../../store/useMachineSearchStore";
import DetailsModal from "./DetailsModal";

const MachinesTable = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedMachine, setSelectedMachine] = useState(null);
  const { searchTerm, selectedStatuses } = useMachineSearchStore();

  const {
    data: machinesData = {},

    isLoading,
    error,
    refetch,
  } = useQuery({ queryKey: ["machines"], queryFn: fetchMachines });
  console.log(machinesData);

  const machines = machinesData.machines || [];

  const filteredMachines = machines.filter((machine) => {
    // const matchesSearch = machine.name
    //   .toLowerCase()
    //   .includes(searchTerm.toLowerCase().trim());
    const matchesStatus =
      selectedStatuses.length === 0 ||
      selectedStatuses.includes(machine.status);
    // return matchesSearch && matchesStatus;
    return matchesStatus;
  });

  const handleClick = (machine) => {
    setSelectedMachine(machine);
  };

  const closeModal = () => {
    setSelectedMachine(null);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="full flex h-[45vh] flex-col space-y-4">
      <div className="hide-scrollbar w-full rounded-lg">
        <div className="flex flex-col">
          <div className="sticky top-0 z-10 mb-[10px] grid grid-cols-[7%_32%_30%_20%_10%] bg-white p-3 shadow-md dark:bg-[#171717]">
            <div>ID</div>
            <div>Name</div>
            <div>Location</div>
            <div>Status</div>
            <div>Actions</div>
          </div>

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
                        machine.status === "OPERATIONAL"
                          ? "text-green-600"
                          : machine.status === "OUT_OF_SERVICE"
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
                          key={machine.id}
                          machine={machine}
                          refetch={refetch}
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

      {selectedMachine && (
        <DetailsModal item={selectedMachine} onClose={closeModal} />
      )}
    </div>
  );
};

export default MachinesTable;
