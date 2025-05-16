import { apiClient } from "./apiClient";

export const fetchUserByUsername = (username) =>
  apiClient(`/users/${username}`);
