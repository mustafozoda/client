import { apiClient } from "./apiClient";

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

export const resetPassword = async (newPassword, token) => {
  try {
    const response = await apiClient("/users/reset-password", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (typeof response === "string") {
      return response.replace(/^"|"$/g, ""); // clean string if quoted
    }

    return response;
  } catch (error) {
    console.error("Reset password failed:", error);
    throw error;
  }
};
