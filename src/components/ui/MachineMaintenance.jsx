import React, { useState, useEffect } from "react";
import { fetchMachines } from "../../api/machinesApi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import useThemeStore from "../../store/useThemeStore";
import BlinkingDot from "./BlinkingDot";

export default function MachineMaintenance() {
  const [machines, setMachines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const machinesPerPage = 1;
  const { theme } = useThemeStore();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchMachines();
      const filteredMachines = data.filter((machine) => {
        const nextMaintenanceDate = new Date(machine.nextMaintenance);
        const currentDate = new Date();
        return nextMaintenanceDate >= currentDate;
      });

      const sortedMachines = filteredMachines.sort(
        (a, b) => new Date(a.nextMaintenance) - new Date(b.nextMaintenance),
      );
      setMachines(sortedMachines);
    };

    fetchData();
  }, []);

  const indexOfLastMachine = currentPage * machinesPerPage;
  const indexOfFirstMachine = indexOfLastMachine - machinesPerPage;
  const currentMachines = machines.slice(
    indexOfFirstMachine,
    indexOfLastMachine,
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex h-full w-full flex-col items-center p-4">
      {currentMachines.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0 }}
          className="w-[25vw]"
        >
          <div className="relative transform overflow-hidden truncate rounded-xl bg-white p-6 shadow-[0_-1px_10px_rgba(0,0,0,0.2)] transition-transform hover:scale-105 dark:bg-[#171717]">
            <div className="absolute right-4 top-4">
              <BlinkingDot />
            </div>
            <h3 className="text-center text-xl font-semibold">
              {currentMachines[0].name}
            </h3>
            <p className="mb-2 text-center text-gray-600">
              {currentMachines[0].description}
            </p>
            <div className="overflow-hidden truncate rounded-lg p-4 text-center shadow-[0_2px_2px_rgba(0,0,0,0.5)] dark:bg-[#212121]">
              <p>
                <strong>Location:</strong> {currentMachines[0].location}
              </p>
              <p>
                <strong>Next Maintenance:</strong>{" "}
                {new Date(
                  currentMachines[0].nextMaintenance,
                ).toLocaleDateString()}
              </p>
              <p
                className={`font-semibold ${
                  currentMachines[0].status === "Operational"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                <strong>Status:</strong> {currentMachines[0].status}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <div className="mt-4 flex">
        <Stack spacing={5}>
          <Pagination
            count={Math.ceil(machines.length / machinesPerPage)}
            shape="rounded"
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            sx={{
              "& .MuiPaginationItem-root": {
                color: theme === "dark" ? "white" : "black",
              },
            }}
          />
        </Stack>
      </div>
    </div>
  );
}
