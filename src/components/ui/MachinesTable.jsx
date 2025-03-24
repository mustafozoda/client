import React, { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchMachines } from "../../api/machinesApi";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronsUpDown, ChevronsDownUp } from "lucide-react";
const MachinesTable = () => {
  const tableRef = useRef(null);
  const [showScrollToTopButton, setShowScrollToTopButton] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const isAtBottom =
          tableRef.current.scrollHeight - tableRef.current.scrollTop ===
          tableRef.current.clientHeight;
        console.log(isAtBottom); // Log if the condition is true
        setShowScrollToTopButton(isAtBottom);
      }
    };

    if (tableRef.current) {
      tableRef.current.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (tableRef.current) {
        tableRef.current.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollToTop = () => {
    if (tableRef.current) {
      tableRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

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
    <div className="hide-scrollbar h-full w-full rounded-lg bg-white dark:bg-[#171717]">
      <table
        ref={tableRef}
        className="h-full w-full table-auto rounded-lg shadow-md"
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
                <td className="border-[#d8d8d8] p-3 dark:border-[#2B2B2B]">
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
                <td className="flex items-center justify-center p-3">
                  <button
                    className="flex items-center justify-center"
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
                    className="bg-white dark:bg-[#171717]"
                  >
                    <td colSpan={5} className="p-2">
                      <motion.div
                        className="m-1 overflow-hidden rounded-lg border border-[#d8d8d8] p-3 dark:border-[#2B2B2B]"
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ opacity: 0, y: 0 }}
                        // transition={{ duration: 1, ease: "easeInOut" }}
                      >
                        <p className="text-sm">{machine.description}</p>
                        <p className="text-sm">
                          Last Maintenance: {machine.lastMaintenance}
                        </p>
                        <p className="text-sm">
                          Next Maintenance: {machine.nextMaintenance}
                        </p>
                        <img
                          src={machine.photoUrl}
                          alt={machine.name}
                          className="mt-2 h-24 w-24 rounded-md object-cover"
                        />
                      </motion.div>
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
      {showScrollToTopButton && (
        <button
          className="fixed bottom-10 left-1/2 z-40 -translate-x-1/2 transform rounded-full bg-blue-500 p-3 text-white shadow-lg"
          onClick={scrollToTop}
        >
          Scroll to Top
        </button>
      )}
    </div>
  );
};

export default MachinesTable;
