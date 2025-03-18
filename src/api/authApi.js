import { apiClient } from "./apiClient";

export const login = (credentials) =>
  apiClient("/login", { method: "POST", body: JSON.stringify(credentials) });
