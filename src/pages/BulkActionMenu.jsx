import React, { useEffect, useCallback, Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  Trash2,
  Tag,
  Flag,
  UserPlus,
  ChevronDown,
  RefreshCw,
} from "lucide-react";

const defaultStatuses = [
  { key: "PENDING", label: "Pending", Icon: Tag, color: "text-indigo-600" },
  {
    key: "IN_PROGRESS",
    label: "In Progress",
    Icon: Tag,
    color: "text-indigo-600",
  },
  { key: "COMPLETED", label: "Completed", Icon: Tag, color: "text-indigo-600" },
  { key: "CANCELLED", label: "Cancelled", Icon: Tag, color: "text-indigo-600" },
];

const defaultPriorities = [
  { key: "HIGH", label: "High", Icon: Flag, color: "text-red-500" },
  { key: "MEDIUM", label: "Medium", Icon: Flag, color: "text-yellow-500" },
  { key: "LOW", label: "Low", Icon: Flag, color: "text-green-500" },
];

export default function BulkActionMenu({
  selectedCount = 0,
  statuses = defaultStatuses,
  priorities = defaultPriorities,
  onDelete,
  onChangeStatus,
  onChangePriority,
  onAssign,
}) {
  const [loading, setLoading] = useState({
    delete: false,
    status: false,
    priority: false,
    assign: false,
  });

  const handleAction = useCallback(async (type, fn) => {
    setLoading((prev) => ({ ...prev, [type]: true }));
    try {
      await fn();
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }));
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (selectedCount < 2) return;
      if (e.ctrlKey && e.shiftKey) {
        switch (e.key.toLowerCase()) {
          case "d":
            e.preventDefault();
            handleAction("delete", onDelete);
            break;
          case "s":
            e.preventDefault();
            handleAction("status", () => onChangeStatus(statuses[0].key));
            break;
          case "p":
            e.preventDefault();
            handleAction("priority", () => onChangePriority(priorities[0].key));
            break;
          default:
        }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    selectedCount,
    handleAction,
    onDelete,
    onChangeStatus,
    onChangePriority,
    statuses,
    priorities,
  ]);

  const mainButtonClasses = `flex items-center gap-2 rounded-md px-4 py-1 shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${
    selectedCount >= 2
      ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500"
      : "bg-gray-300 text-gray-600 cursor-not-allowed"
  }`;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button disabled={selectedCount < 2} className={mainButtonClasses}>
        <Tag size={18} />
        Actions {selectedCount >= 2 && `(${selectedCount})`}
        {loading.delete && <RefreshCw size={16} className="animate-spin" />}
        <ChevronDown size={16} />
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Menu.Items className="absolute left-0 z-50 mt-2 w-[350px] origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-[#212121]">
          <div className="px-4 py-3">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => handleAction("delete", onDelete)}
                  disabled={loading.delete}
                  className={`${active ? "bg-red-50" : ""} flex w-full items-center gap-2 rounded-md px-3 py-2 font-medium text-red-600 transition focus:bg-red-100 focus:outline-none disabled:opacity-50`}
                >
                  <Trash2 size={16} /> Delete Selected
                </button>
              )}
            </Menu.Item>
          </div>

          <div className="flex w-full">
            <div className="px-4 py-2">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Change Status
              </p>
              {statuses.map(({ key, label, Icon, color }) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        handleAction("status", () => onChangeStatus(key))
                      }
                      className={`${active ? "bg-gray-100" : ""} flex w-full items-center gap-2 rounded-md px-3 py-2 font-medium transition focus:bg-gray-200 focus:outline-none`}
                    >
                      <Icon size={16} className={color} /> {label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
            <div className="px-4 py-2">
              <p className="text-xs font-semibold uppercase text-gray-500">
                Change Priority
              </p>
              {priorities.map(({ key, label, Icon, color }) => (
                <Menu.Item key={key}>
                  {({ active }) => (
                    <button
                      onClick={() =>
                        handleAction("priority", () => onChangePriority(key))
                      }
                      className={`${active ? "bg-gray-100" : ""} flex w-full items-center gap-2 rounded-md px-3 py-2 font-medium transition focus:bg-gray-200 focus:outline-none`}
                    >
                      <Icon size={16} className={color} /> {label}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </div>
          </div>

          <div className="px-4 py-3">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={() => {
                    const userId = window.prompt(
                      "Enter user ID to assign tasks to:",
                    );
                    if (userId) handleAction("assign", () => onAssign(userId));
                  }}
                  className={`${active ? "bg-blue-50" : ""} flex w-full items-center gap-2 rounded-md px-3 py-2 font-medium text-blue-600 transition focus:bg-blue-100 focus:outline-none`}
                >
                  <UserPlus size={16} /> Assign To...
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
