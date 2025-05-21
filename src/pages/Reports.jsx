import React, { useState, useEffect } from "react";
import Header from "../layout/Header";
import { SlidersHorizontal, X } from "lucide-react";
import { fetchTasks } from "../api/tasksApi";
import { fetchMachines } from "../api/machinesApi";
import { getToken } from "../api/apiClient";
import DashboardSummary from "../components/DashboardSummary";
import { useTranslation } from "react-i18next";
const API_BASE_URL = import.meta.env.VITE_BASE_API_URL.replace(/\/$/, "");

export const downloadReport = async ({ reportType, format, query = "" }) => {
  const validTypes = ["tasks", "machines"];
  const validFormats = ["pdf", "xls"];
  if (!validTypes.includes(reportType) || !validFormats.includes(format)) {
    return alert("Invalid report type or format.");
  }

  const token = getToken();
  if (!token) {
    return alert("You must be logged in to download the report.");
  }

  const url = `${API_BASE_URL}/${reportType}/report/${format}${query}`;
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (res.status === 403) {
    return alert("Access denied.  Check your permissions or token.");
  }
  if (!res.ok) {
    return alert(`Download failed: ${res.status} ${res.statusText}`);
  }

  const blob = await res.blob();
  const blobUrl = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = blobUrl;
  const ext = format === "xls" ? "xls" : "pdf";
  a.download = `${reportType}-report.${ext}`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(blobUrl);
};

function Modal({ title, children, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        className="w-[40%] rounded-lg bg-white p-6 shadow-lg dark:bg-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-semibold">{title}</h3>
          <button onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}

function TaskFilterModal({ categories, filters, onApply, onClose }) {
  const [local, setLocal] = useState(filters);
  const reset = () =>
    setLocal({
      status: [],
      priority: [],
      category: [],
      // dateFrom: "",
      // dateTo: "",
    });

  return (
    <Modal title="Filter Tasks" onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              multiple
              value={local.status}
              onChange={(e) =>
                setLocal({
                  ...local,
                  status: Array.from(e.target.selectedOptions, (o) => o.value),
                })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            >
              <option value="PENDING">Pending</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
          </div>

          {/* Priority */}
          <div>
            <label className="block text-sm font-medium">Priority</label>
            <select
              multiple
              value={local.priority}
              onChange={(e) =>
                setLocal({
                  ...local,
                  priority: Array.from(
                    e.target.selectedOptions,
                    (o) => o.value,
                  ),
                })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            >
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 items-start justify-center gap-4">
          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              multiple
              value={local.category}
              onChange={(e) =>
                setLocal({
                  ...local,
                  category: Array.from(
                    e.target.selectedOptions,
                    (o) => o.value,
                  ),
                })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Created Date Range */}
          <div className="grid grid-rows-2 gap-2">
            <div>
              <label className="block text-sm font-medium">Created From</label>
              <input
                type="date"
                value={local.dateFrom}
                onChange={(e) =>
                  setLocal({ ...local, dateFrom: e.target.value })
                }
                className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Created To</label>
              <input
                type="date"
                value={local.dateTo}
                onChange={(e) => setLocal({ ...local, dateTo: e.target.value })}
                className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={reset}
          className="text-sm text-gray-500 hover:underline"
        >
          Reset Filters
        </button>
        <button
          onClick={() => onApply(local)}
          className="rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
        >
          Apply
        </button>
      </div>
    </Modal>
  );
}

function MachineFilterModal({ locations, filters, onApply, onClose }) {
  const [local, setLocal] = useState(filters);
  const reset = () =>
    setLocal({
      status: [],
      location: [],
      // addedFrom: "",
      // addedTo: "",
      // lastMaintenanceFrom: "",
      // lastMaintenanceTo: "",
      // nextMaintenanceFrom: "",
      // nextMaintenanceTo: "",
    });

  return (
    <Modal title="Filter Machines" onClose={onClose}>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Status */}
          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              multiple
              value={local.status}
              onChange={(e) =>
                setLocal({
                  ...local,
                  status: Array.from(e.target.selectedOptions, (o) => o.value),
                })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            >
              <option value="OPERATIONAL">OPERATIONAL</option>
              <option value="UNDER_MAINTENANCE">UNDER_MAINTENANCE</option>
              <option value="OUT_OF_SERVICE">OUT_OF_SERVICE</option>
            </select>
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium">Location</label>
            <select
              multiple
              value={local.location}
              onChange={(e) =>
                setLocal({
                  ...local,
                  location: Array.from(
                    e.target.selectedOptions,
                    (o) => o.value,
                  ),
                })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            >
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Date Added Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Added From</label>
            <input
              type="date"
              value={local.addedFrom}
              onChange={(e) =>
                setLocal({ ...local, addedFrom: e.target.value })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Added To</label>
            <input
              type="date"
              value={local.addedTo}
              onChange={(e) => setLocal({ ...local, addedTo: e.target.value })}
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            />
          </div>
        </div>

        {/* Last Maintenance Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Last Maint. From
            </label>
            <input
              type="date"
              value={local.lastMaintenanceFrom}
              onChange={(e) =>
                setLocal({ ...local, lastMaintenanceFrom: e.target.value })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Last Maint. To</label>
            <input
              type="date"
              value={local.lastMaintenanceTo}
              onChange={(e) =>
                setLocal({ ...local, lastMaintenanceTo: e.target.value })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            />
          </div>
        </div>

        {/* Next Maintenance Range */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">
              Next Maint. From
            </label>
            <input
              type="date"
              value={local.nextMaintenanceFrom}
              onChange={(e) =>
                setLocal({ ...local, nextMaintenanceFrom: e.target.value })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Next Maint. To</label>
            <input
              type="date"
              value={local.nextMaintenanceTo}
              onChange={(e) =>
                setLocal({ ...local, nextMaintenanceTo: e.target.value })
              }
              className="mt-1 w-full rounded border px-2 py-1 dark:bg-[#212121]"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <button
          onClick={reset}
          className="text-sm text-gray-500 hover:underline"
        >
          Reset Filters
        </button>
        <button
          onClick={() => onApply(local)}
          className="rounded bg-purple-600 px-4 py-1 text-white hover:bg-purple-700"
        >
          Apply
        </button>
      </div>
    </Modal>
  );
}

export default function Reports() {
  const { t } = useTranslation("common");
  const [categories, setCategories] = useState([]);
  const [locations, setLocations] = useState([]);
  const [taskFilterOpen, setTaskFilterOpen] = useState(false);
  const [machineFilterOpen, setMachineFilterOpen] = useState(false);
  const [taskFilters, setTaskFilters] = useState({
    status: [],
    priority: [],
    category: [],
    dateFrom: "",
    dateTo: "",
  });
  const [machineFilters, setMachineFilters] = useState({
    status: [],
    location: [],
    addedFrom: "",
    addedTo: "",
    lastMaintenanceFrom: "",
    lastMaintenanceTo: "",
    nextMaintenanceFrom: "",
    nextMaintenanceTo: "",
  });

  useEffect(() => {
    fetchTasks().then(({ tasks }) => {
      setCategories(
        Array.from(new Set(tasks.map((t) => t.category))).filter(Boolean),
      );
    });
    fetchMachines().then(({ machines }) => {
      setLocations(
        Array.from(new Set(machines.map((m) => m.location))).filter(Boolean),
      );
    });
  }, []);

  const applyTaskFilters = (f) => {
    setTaskFilters(f);
    setTaskFilterOpen(false);
  };
  const applyMachineFilters = (f) => {
    setMachineFilters(f);
    setMachineFilterOpen(false);
  };

  const buildQuery = (filters) => {
    const p = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (Array.isArray(v)) v.forEach((x) => p.append(k, x));
      else if (v) p.append(k, v);
    });
    return p.toString() ? `?${p}` : "";
  };

  const taskQuery = buildQuery(taskFilters);
  const machineQuery = buildQuery(machineFilters);

  return (
    <div className="flex h-full w-full flex-col bg-[#a1abae] dark:bg-[#212121]">
      <Header title={t("reports")} />
      <div className="mx-auto w-[90%]">
        <div className="grid grid-cols-2 gap-4 py-4">
          {/* Tasks Reports */}
          <section className="space-y-2 rounded bg-white p-6 shadow dark:bg-[#171717]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Tasks Reports</h2>
              <button
                onClick={() => setTaskFilterOpen(true)}
                className="flex items-center gap-2 rounded bg-blue-600 px-4 py-1 text-white hover:bg-blue-700"
              >
                <SlidersHorizontal size={18} /> Filter
              </button>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() =>
                  downloadReport({
                    reportType: "tasks",
                    format: "pdf",
                    query: taskQuery,
                  })
                }
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Export PDF
              </button>
              <button
                onClick={() =>
                  downloadReport({
                    reportType: "tasks",
                    format: "xls",
                    query: taskQuery,
                  })
                }
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Export XLS
              </button>
            </div>
          </section>

          {/* Machines Reports */}
          <section className="space-y-2 rounded bg-white p-6 shadow dark:bg-[#171717]">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Machines Reports</h2>
              <button
                onClick={() => setMachineFilterOpen(true)}
                className="flex items-center gap-2 rounded bg-purple-600 px-4 py-1 text-white hover:bg-purple-700"
              >
                <SlidersHorizontal size={18} /> Filter
              </button>
            </div>
            <div className="flex gap-4 pt-4">
              <button
                onClick={() =>
                  downloadReport({
                    reportType: "machines",
                    format: "pdf",
                    query: machineQuery,
                  })
                }
                className="rounded bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Export PDF
              </button>
              <button
                onClick={() =>
                  downloadReport({
                    reportType: "machines",
                    format: "xls",
                    query: machineQuery,
                  })
                }
                className="rounded bg-green-600 px-4 py-2 text-white hover:bg-green-700"
              >
                Export XLS
              </button>
            </div>
          </section>
        </div>
        <div className="w-full">
          <DashboardSummary />
        </div>
      </div>

      {taskFilterOpen && (
        <TaskFilterModal
          categories={categories}
          filters={taskFilters}
          onApply={applyTaskFilters}
          onClose={() => setTaskFilterOpen(false)}
        />
      )}
      {machineFilterOpen && (
        <MachineFilterModal
          locations={locations}
          filters={machineFilters}
          onApply={applyMachineFilters}
          onClose={() => setMachineFilterOpen(false)}
        />
      )}
    </div>
  );
}
