import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { fetchAllUsers } from "../../api/usersApi";

export default function EditTaskModal({ task, onClose, onSave }) {
  if (!task) return null;

  const formatDate = (iso) => {
    if (!iso) return "";
    return new Date(iso).toISOString().split("T")[0];
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const makeInitialForm = () => ({
    taskName: task.taskName || "",
    taskId: task.id || 0,
    category: task.category || "",
    description: task.description || "",
    priority: task.priority || "LOW",
    cost: task.cost ?? 0,
    deadline: formatDate(task.deadline),
    status: task.status || "PENDING",
    responsibleUserId: task.responsibleUserId || "",
  });

  const [form, setForm] = useState(makeInitialForm());
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setForm(makeInitialForm());
  }, [task]);

  useEffect(() => {
    fetchAllUsers()
      .then((fetched) => {
        setUsers(fetched);
        // console.log("Fetched users:", fetched);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      cost: Number(form.cost),
      responsibleUserId: Number(form.responsibleUserId),
      deadline: form.deadline
        ? new Date(form.deadline).toISOString()
        : task.deadline,
    };

    onSave(payload);
    // console.log("Saving task", payload);
    onClose();
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-[40vw] max-w-full rounded-2xl bg-white p-4 shadow-2xl dark:bg-[#171717]"
        initial={{ y: 750 }}
        animate={{ y: 0 }}
        exit={{ y: 750 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="mb-2 text-center text-2xl font-bold text-gray-800 dark:text-white">
          Edit Task: {task.id}
        </h2>

        <div className="rounded-lg bg-gray-100 p-5 shadow-md dark:bg-[#2B2B2B]">
          <form onSubmit={handleSubmit} className="space-y-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Task Name
              </label>
              <input
                name="taskName"
                type="text"
                value={form.taskName}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Category
              </label>
              <input
                name="category"
                type="text"
                value={form.category}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                value={form.description}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Priority
                </label>
                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Status
                </label>
                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="COMPLETED">COMPLETED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Cost
                </label>
                <input
                  name="cost"
                  type="number"
                  value={form.cost}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                  Responsible User
                </label>
                <select
                  name="responsibleUserId"
                  value={form.responsibleUserId}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
                >
                  <option value="">Select user</option>
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {capitalize(u.username)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-300">
                Deadline
              </label>
              <input
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border p-2 dark:bg-[#333] dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-lg bg-blue-600 py-3 text-white transition hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
}
