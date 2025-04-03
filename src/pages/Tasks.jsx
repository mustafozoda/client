import React, { useEffect, useState } from "react";
import Header from "../layout/Header";
import { fetchTasks } from "../api/tasksApi";
import {
  Filter,
  Hourglass,
  CheckCircle,
  XCircle,
  Square,
  SquareCheckBig,
} from "lucide-react";
import FilterModal from "../components/FilterModal";
import LinearProgress from "@mui/material/LinearProgress";
import TaskFilter from "../components/logic/TaskFilter";

const statusConfig = {
  PENDING: {
    label: "Pending",
    color: "bg-blue-100 text-blue-700",
    icon: <Hourglass size={18} />,
  },
  IN_PROGRESS: {
    label: "In Progress",
    color: "bg-yellow-100 text-yellow-700",
    icon: <Hourglass size={18} />,
  },
  COMPLETED: {
    label: "Completed",
    color: "bg-green-100 text-green-700",
    icon: <CheckCircle size={18} />,
  },
  CANCELLED: {
    label: "Cancelled",
    color: "bg-red-100 text-red-700",
    icon: <XCircle size={18} />,
  },
};

const getProgressColor = (val) =>
  val < 50 ? "green" : val < 80 ? "orange" : "red";

const formatDate = (d) => new Date(d).toLocaleDateString();

const calculateProgress = (deadline) => {
  const now = new Date();
  const end = new Date(deadline);
  const ms = 7 * 24 * 60 * 60 * 1000;
  return Math.max(0, Math.min(100, (1 - (end - now) / ms) * 100)).toFixed(1);
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [selectedTasks, setSelectedTasks] = useState(new Set());
  const [search, setSearch] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    fetchTasks().then((data) => {
      setTasks(data.tasks);
      setFilteredTasks(data.tasks);
    });
  }, []);

  const toggleTaskSelection = (id) => {
    setSelectedTasks((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const applyFilters = (filters) => {
    const updated = tasks.filter((task) => {
      const matchesStatus =
        !filters.status.length || filters.status.includes(task.status);
      const matchesPriority =
        !filters.priority.length || filters.priority.includes(task.priority);
      const matchesKeyword =
        !filters.keyword ||
        task.title?.toLowerCase().includes(filters.keyword.toLowerCase());
      return matchesStatus && matchesPriority && matchesKeyword;
    });
    setFilteredTasks(updated);
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#a1abae] transition dark:bg-[#212121] dark:text-white">
      <Header title="Task Manager" />
      <div className="mx-auto w-[85%] space-y-4 px-6 py-6">
        <div className="mt-4 flex items-center justify-between gap-4">
          <TaskFilter search={search} setSearch={setSearch} />
          <button
            onClick={() => setIsFilterOpen(true)}
            className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            <Filter size={18} /> Filter
          </button>
        </div>

        <div className="divide-y divide-slate-200 rounded-lg bg-white shadow-sm dark:divide-slate-700 dark:bg-[#171717]">
          <div className="grid grid-cols-[5%_10%_30%_15%_10%_20%_10%] px-4 py-3 text-sm font-semibold uppercase tracking-wide text-slate-600 dark:text-slate-400">
            <div></div>
            <div>ID</div>
            <div>Title</div>
            <div>Status</div>
            <div>Priority</div>
            <div>Progress</div>
            <div>Deadline</div>
          </div>

          {filteredTasks
            .filter((task) =>
              task.status?.toLowerCase().includes(search.toLowerCase()),
            )

            .map((task) => (
              <div
                key={task.id}
                className="grid grid-cols-[5%_10%_30%_15%_10%_20%_10%] items-center px-4 py-4 text-sm transition duration-200 hover:bg-slate-100 dark:hover:bg-[#2d2d2d]"
              >
                <div className="flex justify-center">
                  <button onClick={() => toggleTaskSelection(task.id)}>
                    {selectedTasks.has(task.id) ? (
                      <SquareCheckBig className="text-green-500" size={25} />
                    ) : (
                      <Square className="text-gray-400" size={25} />
                    )}
                  </button>
                </div>

                <div>{task.id}</div>

                <div className="truncate">
                  <span className="rounded-[5px] bg-slate-200 px-2 py-1 dark:bg-slate-600">
                    {task.title}
                  </span>
                </div>

                <div className="relative flex flex-col items-start justify-center gap-1">
                  <span
                    className={`inline-flex items-center gap-2 rounded-[5px] px-3 py-1 font-medium ${statusConfig[task.status]?.color}`}
                  >
                    {statusConfig[task.status]?.icon}
                    {statusConfig[task.status]?.label}
                  </span>
                  {new Date(task.deadline) < new Date() && (
                    <span className="absolute left-16 top-4 w-fit rounded-[5px] bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-800 dark:text-white">
                      Overdue
                    </span>
                  )}
                </div>

                <div>
                  <span
                    className={`rounded-[5px] px-2 py-1 font-medium text-white ${
                      task.priority === "HIGH"
                        ? "bg-red-500"
                        : task.priority === "MEDIUM"
                          ? "bg-yellow-400 text-black"
                          : "bg-green-500"
                    }`}
                  >
                    {task.priority}
                  </span>
                </div>

                <div className="space-y-1 px-2">
                  <div className="flex justify-between text-slate-500 dark:text-slate-400">
                    <span>{calculateProgress(task.deadline)}%</span>
                    <span>
                      {Math.ceil(
                        (new Date(task.deadline) - new Date()) /
                          (1000 * 60 * 60 * 24),
                      )}{" "}
                      days left
                    </span>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={calculateProgress(task.deadline)}
                    sx={{
                      height: 8,
                      borderRadius: 5,
                      backgroundColor: "#e2e8f0",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: getProgressColor(
                          calculateProgress(task.deadline),
                        ),
                      },
                    }}
                  />
                </div>

                <div className="text-center text-slate-600 dark:text-slate-300">
                  {formatDate(task.deadline)}
                </div>
              </div>
            ))}
        </div>

        {isFilterOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <FilterModal
              onClose={() => setIsFilterOpen(false)}
              onApply={applyFilters}
            />
          </div>
        )}
      </div>
    </div>
  );
}
