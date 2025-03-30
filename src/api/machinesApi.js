import { apiClient } from "./apiClient";

export const fetchMachines = () => apiClient("/machines/get-machines-by-filter");
export const fetchMachineById = (id) => apiClient(`/machines/get-machine-by-id?id=${id}`);


export const addMachine = (machine) =>
  apiClient("/machines/create", {
    method: "POST",
    body: JSON.stringify(machine),
  });

export const updateMachine = (data) =>
  apiClient(`/machines/update`, {
    method: "PUT",
    body: JSON.stringify(data),
  });

export const deleteMachine = (id) =>
  apiClient(`/machines/delete/${id}`, { method: "DELETE" });