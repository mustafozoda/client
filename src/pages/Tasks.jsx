import React, { useEffect, useState, useMemo } from "react";
import Header from "../layout/Header";
import { fetchTasks, updateTask, deleteTask } from "../api/tasksApi";
import {
  SlidersHorizontal,
  Hourglass,
  CheckCircle,
  XCircle,
  Square,
  SquareCheckBig,
  Trash2,
  Edit2,
  ChevronsUpDown,
  List,
} from "lucide-react";
import FilterModal from "../components/tasksPage/FilterModal";
import LinearProgress from "@mui/material/LinearProgress";
import TaskFilter from "../components/tasksPage/TaskFilter";
import EditTaskModal from "../components/tasksPage/EditTaskModal";
import DetailsModal from "../components/machinesPage/DetailsModal";

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

const statusRank = {
  PENDING: 1,
  IN_PROGRESS: 2,
  CANCELLED: 3,
  COMPLETED: 4,
};
const priorityRank = {
  HIGH: 0,
  MEDIUM: 1,
  LOW: 2,
};

const getProgressColor = (v) => (v < 50 ? "green" : v < 80 ? "orange" : "red");
const formatDate = (iso) => new Date(iso).toLocaleDateString();
const calculateProgress = (dl) => {
  const now = new Date(),
    end = new Date(dl),
    span = 7 * 24 * 60 * 60 * 1000;
  return Math.max(0, Math.min(100, (1 - (end - now) / span) * 100)).toFixed(1);
};

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelected] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [search, setSearch] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [detailsItem, setDetailsItem] = useState(null);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [groupByStatus, setGroupByStatus] = useState(false);

  useEffect(() => {
    fetchTasks().then((r) => {
      setTasks(r.tasks);
      setFiltered(r.tasks);
    });
  }, []);

  useEffect(() => {
    setSelectAll(filtered.length > 0 && selected.size === filtered.length);
  }, [filtered, selected]);

  const toggleSelect = (id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    const newValue = !selectAll;
    setSelectAll(newValue);
    setSelected(newValue ? new Set(filtered.map((t) => t.id)) : new Set());
  };

  const applyFilters = (filters) => {
    const out = tasks.filter((t) => {
      const okStatus =
        !filters.status.length || filters.status.includes(t.status);
      const okPriority =
        !filters.priority.length || filters.priority.includes(t.priority);
      const okKeyword =
        !filters.keyword ||
        t.category?.toLowerCase().includes(filters.keyword.toLowerCase());
      return okStatus && okPriority && okKeyword;
    });
    setFiltered(out);
  };

  const saveEdit = (updated) => {
    updateTask(updated).then(() => {
      const idKey = updated.taskId;
      setTasks((prev) =>
        prev.map((t) => (t.id === idKey ? { ...t, ...updated, id: idKey } : t)),
      );
      setFiltered((prev) =>
        prev.map((t) => (t.id === idKey ? { ...t, ...updated, id: idKey } : t)),
      );
      setEditing(null);
    });
  };

  const deleteSelected = () => {
    const [id] = Array.from(selected);
    deleteTask(id).then(() => {
      setTasks((prev) => prev.filter((t) => t.id !== id));
      setFiltered((prev) => prev.filter((t) => t.id !== id));
      setSelected(new Set());
    });
  };

  const openEdit = () => {
    const [id] = Array.from(selected);
    const task = tasks.find((t) => t.id === id);
    setEditing(task);
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedTasks = useMemo(() => {
    let sortable = [...filtered];
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];
        if (sortConfig.key === "status") {
          aVal = statusRank[aVal];
          bVal = statusRank[bVal];
        } else if (sortConfig.key === "deadline") {
          aVal = new Date(aVal);
          bVal = new Date(bVal);
        } else if (sortConfig.key === "priority") {
          aVal = priorityRank[aVal];
          bVal = priorityRank[bVal];
        } else {
          aVal = (aVal || "").toString().toLowerCase();
          bVal = (bVal || "").toString().toLowerCase();
        }
        if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
        if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }
    return sortable;
  }, [filtered, sortConfig]);

  const groupedTasks = useMemo(() => {
    return sortedTasks.reduce((acc, task) => {
      acc[task.status] = acc[task.status] || [];
      acc[task.status].push(task);
      return acc;
    }, {});
  }, [sortedTasks]);

  const statusesOrder = Object.keys(statusConfig).sort(
    (a, b) => statusRank[a] - statusRank[b],
  );

  return (
    <div className="flex h-full w-full flex-col bg-[#a1abae] dark:bg-[#212121]">
      <Header title="Task Manager" />
      <div className="mx-auto w-[85%] space-y-4 px-6 py-6">
        <div className="flex items-center justify-between">
          <TaskFilter search={search} setSearch={setSearch} />
          <div className="flex items-center gap-2">
            {selected.size === 1 && (
              <>
                <button
                  onClick={openEdit}
                  className="flex items-center gap-2 rounded bg-green-600 px-4 py-1 text-white hover:bg-green-700"
                >
                  <Edit2 size={18} /> Edit
                </button>
                <button
                  onClick={deleteSelected}
                  className="flex items-center gap-2 rounded bg-red-600 px-4 py-1 text-white hover:bg-red-700"
                >
                  <Trash2 size={18} /> Delete
                </button>
              </>
            )}
            <button
              onClick={() => setGroupByStatus((g) => !g)}
              className="flex items-center gap-2 rounded bg-purple-600 px-4 py-1 text-white hover:bg-purple-700"
            >
              <List size={18} /> {groupByStatus ? "Ungroup" : "Group by Status"}
            </button>
            <button
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
            >
              <SlidersHorizontal size={18} /> Filter
            </button>
          </div>
        </div>

        <div className="hide-scrollbar-p h-[70vh] divide-y-[5px] divide-[#a1abae] overflow-y-scroll rounded-[5px] bg-white shadow dark:divide-[#212121] dark:bg-[#171717]">
          <div className="sticky top-0 z-20 grid grid-cols-[5%_10%_20%_25%_10%_20%_10%] bg-white px-4 py-2 font-semibold uppercase text-slate-600 dark:bg-[#171717] dark:text-slate-400">
            <div className="flex justify-center">
              <button onClick={toggleSelectAll}>
                {selectAll ? (
                  <SquareCheckBig size={25} className="text-green-500" />
                ) : (
                  <Square size={25} className="text-gray-400" />
                )}
              </button>
            </div>
            {[
              { key: "id", label: "ID" },
              { key: "category", label: "Category" },
              { key: "status", label: "Status" },
              { key: "priority", label: "Priority" },
              { key: "progress", label: "Progress" },
              { key: "deadline", label: "Deadline" },
            ].map((col) => (
              <div
                key={col.key}
                onClick={() => handleSort(col.key)}
                className="flex cursor-pointer items-center"
              >
                <span>{col.label}</span>
                <ChevronsUpDown
                  size={16}
                  className={`${sortConfig.key === col.key ? "text-blue-500" : "text-gray-400"} ml-1`}
                />
              </div>
            ))}
          </div>

          {!groupByStatus
            ? sortedTasks
                .filter((t) =>
                  t.status.toLowerCase().includes(search.toLowerCase()),
                )
                .map((t) => (
                  <div
                    key={t.id}
                    onClick={() => setDetailsItem(t)}
                    className="grid cursor-pointer grid-cols-[5%_10%_20%_25%_10%_20%_10%] items-center px-4 py-4 hover:bg-slate-100 dark:hover:bg-[#2d2d2d]"
                  >
                    <div className="flex justify-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSelect(t.id);
                        }}
                      >
                        {selected.has(t.id) ? (
                          <SquareCheckBig
                            size={25}
                            className="text-green-500"
                          />
                        ) : (
                          <Square size={25} className="text-gray-400" />
                        )}
                      </button>
                    </div>
                    <div>{t.id}</div>
                    <div className="truncate">
                      <span className="rounded bg-slate-200 px-2 py-1 dark:bg-slate-600">
                        {t.category}
                      </span>
                    </div>
                    <div className="relative">
                      <span
                        className={`inline-flex items-center gap-2 rounded px-3 py-1 font-medium ${statusConfig[t.status]?.color}`}
                      >
                        {statusConfig[t.status]?.icon}
                        {statusConfig[t.status]?.label}
                      </span>
                      {new Date(t.deadline) < new Date() && (
                        <span className="absolute left-16 top-0 rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">
                          Overdue
                        </span>
                      )}
                    </div>
                    <div>
                      <span
                        className={`rounded px-2 py-1 font-medium text-white ${
                          t.priority === "HIGH"
                            ? "bg-red-500"
                            : t.priority === "MEDIUM"
                              ? "bg-yellow-400 text-black"
                              : "bg-green-500"
                        }`}
                      >
                        {t.priority}
                      </span>
                    </div>
                    <div className="space-y-1 px-2">
                      <div className="flex justify-between text-slate-500 dark:text-slate-400">
                        <span>{calculateProgress(t.deadline)}%</span>
                        <span>
                          {Math.ceil(
                            (new Date(t.deadline) - new Date()) /
                              (1000 * 60 * 60 * 24),
                          )}{" "}
                          days left
                        </span>
                      </div>
                      <LinearProgress
                        variant="determinate"
                        value={calculateProgress(t.deadline)}
                        sx={{
                          height: 8,
                          borderRadius: 5,
                          backgroundColor: "#e2e8f0",
                          "& .MuiLinearProgress-bar": {
                            backgroundColor: getProgressColor(
                              calculateProgress(t.deadline),
                            ),
                          },
                        }}
                      />
                    </div>
                    <div className="text-center text-slate-600 dark:text-slate-300">
                      {formatDate(t.deadline)}
                    </div>
                  </div>
                ))
            : statusesOrder.map((status) =>
                groupedTasks[status] ? (
                  <React.Fragment key={status}>
                    <div className="px-4 py-2 font-semibold dark:bg-[#171717]">
                      {statusConfig[status].label}
                    </div>
                    {groupedTasks[status]
                      .filter((t) =>
                        t.status.toLowerCase().includes(search.toLowerCase()),
                      )
                      .map((t) => (
                        <div
                          key={t.id}
                          onClick={() => setDetailsItem(t)}
                          className="grid cursor-pointer grid-cols-[5%_10%_20%_25%_10%_20%_10%] items-center px-4 py-4 hover:bg-slate-100 dark:hover:bg-[#2d2d2d]"
                        >
                          {/* same row markup as above */}
                          <div className="flex justify-center">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleSelect(t.id);
                              }}
                            >
                              {selected.has(t.id) ? (
                                <SquareCheckBig
                                  size={25}
                                  className="text-green-500"
                                />
                              ) : (
                                <Square size={25} className="text-gray-400" />
                              )}
                            </button>
                          </div>
                          <div>{t.id}</div>
                          <div className="truncate">
                            <span className="rounded bg-slate-200 px-2 py-1 dark:bg-slate-600">
                              {t.category}
                            </span>
                          </div>
                          <div className="relative">
                            <span
                              className={`inline-flex items-center gap-2 rounded px-3 py-1 font-medium ${statusConfig[t.status]?.color}`}
                            >
                              {statusConfig[t.status]?.icon}
                              {statusConfig[t.status]?.label}
                            </span>
                            {new Date(t.deadline) < new Date() && (
                              <span className="absolute left-16 top-0 rounded bg-red-100 px-2 py-0.5 text-xs text-red-600">
                                Overdue
                              </span>
                            )}
                          </div>
                          <div>
                            <span
                              className={`rounded px-2 py-1 font-medium text-white ${
                                t.priority === "HIGH"
                                  ? "bg-red-500"
                                  : t.priority === "MEDIUM"
                                    ? "bg-yellow-400 text-black"
                                    : "bg-green-500"
                              }`}
                            >
                              {t.priority}
                            </span>
                          </div>
                          <div className="space-y-1 px-2">
                            <div className="flex justify-between text-slate-500 dark:text-slate-400">
                              <span>{calculateProgress(t.deadline)}%</span>
                              <span>
                                {Math.ceil(
                                  (new Date(t.deadline) - new Date()) /
                                    (1000 * 60 * 60 * 24),
                                )}{" "}
                                days left
                              </span>
                            </div>
                            <LinearProgress
                              variant="determinate"
                              value={calculateProgress(t.deadline)}
                              sx={{
                                height: 8,
                                borderRadius: 5,
                                backgroundColor: "#e2e8f0",
                                "& .MuiLinearProgress-bar": {
                                  backgroundColor: getProgressColor(
                                    calculateProgress(t.deadline),
                                  ),
                                },
                              }}
                            />
                          </div>
                          <div className="text-center text-slate-600 dark:text-slate-300">
                            {formatDate(t.deadline)}
                          </div>
                        </div>
                      ))}
                  </React.Fragment>
                ) : null,
              )}

          <div className="sticky bottom-0 bg-white px-4 py-5 font-semibold uppercase text-slate-600 dark:bg-[#171717]"></div>
        </div>

        {editing && (
          <EditTaskModal
            task={editing}
            onClose={() => setEditing(null)}
            onSave={saveEdit}
          />
        )}
        {detailsItem && (
          <DetailsModal
            item={detailsItem}
            onClose={() => setDetailsItem(null)}
          />
        )}
      </div>
      {filterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <FilterModal
            onClose={() => setFilterOpen(false)}
            onApply={applyFilters}
          />
        </div>
      )}
    </div>
  );
}
