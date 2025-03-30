import { apiClient } from "./apiClient";

export const fetchTasks = () => apiClient("/tasks/get-tasks-by-filter");
export const fetchTaskById = (id) => apiClient(`/tasks/get-task-by-id?id=${id}`);

export const addTask = (task) =>
  apiClient("/tasks/create", {
    method: "POST",
    body: JSON.stringify({
      ...task,
      status: task.status || "PENDING",
    }),
  });

export const updateTask = (data) =>
  apiClient("/tasks/update", { method: "PUT", body: JSON.stringify(data) });

export const deleteTask = (id) =>
  apiClient(`/tasks/delete/${id}`, { method: "DELETE" });
