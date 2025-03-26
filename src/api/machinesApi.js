import { apiClient } from "./apiClient";
export const fetchMachines = () => apiClient("/machines");
export const fetchMachineById = (id) => apiClient(`/machines/${id}`);

export const addMachine = (machine) =>
  apiClient("/machines", {
    method: "POST",
    body: JSON.stringify(machine),
  });

export const updateMachine = (id, data) =>
  apiClient(`/machines/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });


export const deleteMachine = (id) =>
  apiClient(`/machines/${id}`, { method: "DELETE" });
