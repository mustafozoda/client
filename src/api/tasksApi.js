import { apiClient } from "./apiClient";

export const fetchTasks = () => apiClient("/tasks");

export const addTask = (task) =>
  apiClient("/tasks", { method: "POST", body: JSON.stringify(task) });

export const updateTask = (id, data) =>
  apiClient(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(data) });

export const deleteTask = (id) =>
  apiClient(`/tasks/${id}`, { method: "DELETE" });
