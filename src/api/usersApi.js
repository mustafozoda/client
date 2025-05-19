import { apiClient } from "./apiClient";

// usersApi.js
export const fetchCurrentUser = async () => {
  const result = await apiClient("/users/getCurrentUser", { method: "POST" });
  if (typeof result === "string") {
    const text = result.replace(/^"|"$/g, "");
    return text.includes(":")
      ? text.split(":").pop().trim()
      : text.trim();
  }
  return result.username || result.user?.username || null;
};

export const fetchUserByUsername = async (username) => {
  if (!username) {
    console.error("fetchUserByUsername called with empty username");
    return null;
  }
  const data = await apiClient(`/users/${encodeURIComponent(username)}`, {
    method: "GET",
  });
  return data;
};
