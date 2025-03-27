import { apiClient } from "./apiClient";

export const login = async (credentials) => {
  const response = await apiClient("/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });

  const textResponse = await response.text(); 

  if (textResponse.startsWith("eyJ")) {
    localStorage.setItem("authToken", textResponse);
  }

  return response;
};
