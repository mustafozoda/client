import { apiClient } from "./apiClient";

export const login = async (credentials) => {
  const response = await apiClient("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  if (response.token) {
    localStorage.setItem("authToken", response.token);
  }

  return response;
};
