import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMachines } from "../../api/machinesApi";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";
import MachineDetails from "./MachineDetails";
const MachinesTable = () => {
  const tableRef = useRef(null);

  const {
    data: machines = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["machines"],
    queryFn: fetchMachines,
  });

  const [expandedRow, setExpandedRow] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading data</p>;

  return (
    <div className="hide-scrollbar h-full w-full rounded-lg">
      <table
        ref={tableRef}
        className="h-full w-full table-auto border-separate border-spacing-y-2 rounded-lg shadow-md"
      >
        <thead className="sticky top-0 z-10 bg-white shadow-md dark:bg-[#171717]">
          <tr className="text-left">
            <th className="p-3">ID</th>
            <th className="p-3">Name</th>
            <th className="p-3">Location</th>
            <th className="p-3">Status</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>

        <tbody className="">
          {machines.map((machine) => (
            <React.Fragment key={machine.id}>
              <motion.tr
                className="border-b border-[#d8d8d8] bg-white dark:border-[#2B2B2B] dark:bg-[#171717]"
                whileHover={{ scale: 1 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.01 }}
              >
                <td className="rounded-l-[5px] border-[#d8d8d8] p-3 dark:border-[#2B2B2B]">
                  {machine.id}
                </td>
                <td className="p-3 font-semibold">{machine.name}</td>
                <td className="p-3">{machine.location}</td>
                <td
                  className={`p-3 font-medium ${
                    machine.status === "Active"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {machine.status}
                </td>
                <td className="rounded-r-[5px] p-3 text-center">
                  <button
                    className=""
                    onClick={() =>
                      setExpandedRow(
                        expandedRow === machine.id ? null : machine.id,
                      )
                    }
                  >
                    {expandedRow === machine.id ? (
                      <ChevronsDownUp />
                    ) : (
                      <ChevronsUpDown />
                    )}
                  </button>
                </td>
              </motion.tr>

              <AnimatePresence>
                {expandedRow === machine.id && (
                  <motion.tr
                    key={`expanded-${machine.id}`}
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ opacity: 0, y: 0 }}
                    // transition={{ duration: 1, ease: "easeInOut" }}
                    className="rounded-[5px]"
                  >
                    <td colSpan={5} className="p-2">
                      <MachineDetails machine={machine} />
                    </td>
                  </motion.tr>
                )}
              </AnimatePresence>
            </React.Fragment>
          ))}
        </tbody>
        <tfoot className="sticky bottom-0 z-10 bg-white shadow-[0_-1px_10px_rgba(0,0,0,0.2)] dark:bg-[#171717]">
          <tr className="text-left">
            <th className="p-5"> </th>
            <th className="p-5"> </th>
            <th className="p-5"> </th>
            <th className="p-5"> </th>
            <th className="p-5"></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default MachinesTable;
