import React, { useState, useEffect } from "react";
import {
  fetchMachines,
  deleteMachine,
  updateMachine,
} from "../../api/machinesApi";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import useThemeStore from "../../store/useThemeStore";
import BlinkingDot from "../overviewPage/BlinkingDot";
import { Trash2, SquarePen } from "lucide-react";

const toIsoZ = (dateStr) => new Date(dateStr).toISOString().split(".")[0] + "Z";

export default function MachineMaintenance() {
  const [machines, setMachines] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const machinesPerPage = 1;
  const { theme } = useThemeStore();
  const [editing, setEditing] = useState({ location: false, status: false });
  const [draft, setDraft] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetchMachines();
      if (Array.isArray(data.machines)) {
        const upcoming = data.machines
          .filter((m) => new Date(m.nextMaintenanceDateTime) >= new Date())
          .sort(
            (a, b) =>
              new Date(a.nextMaintenanceDateTime) -
              new Date(b.nextMaintenanceDateTime),
          );
        setMachines(upcoming);
      }
    } catch (err) {
      console.error("Error fetching machines:", err);
    }
  };

  const indexOfLastMachine = currentPage * machinesPerPage;
  const indexOfFirstMachine = indexOfLastMachine - machinesPerPage;
  const currentMachines = machines.slice(
    indexOfFirstMachine,
    indexOfLastMachine,
  );

  const handlePageChange = (e, value) => setCurrentPage(value);

  const handleDelete = async (id) => {
    try {
      await deleteMachine(id);
      const updated = machines.filter((m) => m.id !== id);
      setMachines(updated);
      if (currentPage > Math.ceil(updated.length / machinesPerPage)) {
        setCurrentPage((prev) => Math.max(1, prev - 1));
      }
    } catch (err) {
      console.error("Error deleting:", err);
    }
  };

  const startEdit = (field) => {
    setEditing({ ...editing, [field]: true });
    setDraft({ ...currentMachines[0] });
  };

  const saveEdit = async (field) => {
    try {
      setIsSaving(true);
      const updated = {
        id: draft.id,
        description: draft.description,
        location: draft.location,
        status: draft.status,
        lastMaintenanceDateTime: toIsoZ(
          draft.lastMaintenanceDateTime || draft.lastMaintenanceDateTime,
        ),
        nextMaintenanceDateTime: toIsoZ(
          draft.nextMaintenanceDateTime || draft.nextMaintenanceDateTime,
        ),
      };

      await updateMachine(updated);
      setEditing({ ...editing, [field]: false });
      fetchData();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center">
      {currentMachines.length > 0 && (
        <motion.div
          // initial={{ opacity: 0, y: 20 }}
          // animate={{ opacity: 1, y: 0 }}
          // exit={{ opacity: 0, y: -20 }}
          // transition={{ duration: 0.2 }}
          className="relative h-full w-full transform overflow-hidden rounded-xl bg-white p-6 shadow-xl transition-transform hover:scale-[1.01] dark:bg-[#171717]"
        >
          <div className="absolute right-4 top-4">
            <BlinkingDot />
          </div>

          <div className="m-0 space-y-2">
            <h3 className="text-center text-2xl text-slate-800 dark:text-white">
              {currentMachines[0].name}
            </h3>
            <p className="text-center text-gray-500 dark:text-gray-400">
              {currentMachines[0].description}
            </p>
          </div>

          <div className="mt-6 space-y-4 rounded-lg bg-slate-100 p-4 shadow-md dark:bg-[#212121]">
            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">
                Location:
              </span>
              {editing.location ? (
                <input
                  value={draft.location}
                  onChange={(e) =>
                    setDraft({ ...draft, location: e.target.value })
                  }
                  onBlur={() => saveEdit("location")}
                  autoFocus
                  className="w-1/2 rounded border p-1 text-black dark:bg-[#2b2b2b] dark:text-white"
                />
              ) : (
                <span
                  onClick={() => startEdit("location")}
                  className="cursor-pointer text-blue-600 underline decoration-dotted hover:opacity-80"
                >
                  {currentMachines[0].location}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="text-gray-700 dark:text-gray-300">Status:</span>
              {editing.status ? (
                <select
                  value={draft.status}
                  onChange={(e) =>
                    setDraft({ ...draft, status: e.target.value })
                  }
                  onBlur={() => saveEdit("status")}
                  className="rounded border p-1 text-black dark:bg-[#2b2b2b] dark:text-white"
                >
                  <option value="OPERATIONAL">Active</option>
                  <option value="UNDER_MAINTENANCE">Under Maintenance</option>
                  <option value="OUT_OF_SERVICE">Out of Service</option>
                </select>
              ) : (
                <span
                  onClick={() => startEdit("status")}
                  className={`cursor-pointer rounded-[5px] px-3 py-1 font-bold ${
                    currentMachines[0].status === "OPERATIONAL"
                      ? "bg-green-100 text-green-700"
                      : currentMachines[0].status === "UNDER_MAINTENANCE"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                  }`}
                >
                  {currentMachines[0].status === "OPERATIONAL"
                    ? "Active"
                    : currentMachines[0].status === "UNDER_MAINTENANCE"
                      ? "Under Maintenance"
                      : "Out of Service"}
                </span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <span className="d text-gray-700 dark:text-gray-300">
                Next Maintenance:
              </span>
              <span className="text-slate-600 dark:text-slate-300">
                {new Date(
                  currentMachines[0].nextMaintenanceDateTime,
                ).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="absolute bottom-4 right-4 flex gap-3">
            <button
              onClick={() => startEdit("location")}
              className="text-blue-600 hover:text-blue-800"
            >
              <SquarePen size={20} />
            </button>
            <button
              onClick={() => handleDelete(currentMachines[0].id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 size={20} />
            </button>
          </div>
        </motion.div>
      )}

      <div className="mt-4 flex">
        <Stack spacing={2}>
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
