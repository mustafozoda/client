import { apiClient } from "./apiClient";


export const fetchCurrentUser = async () => {
  const result = await apiClient("/users/getCurrentUser", {
    method: "POST",
  });
  if (typeof result === 'string') {
    return result.replace(/^"|"$/g, '');
  }
  return result.username || result.user?.username || null;
};

/**
 * Fetches a user's details by their username.
 * @param {string} username
 */
export const fetchUserByUsername = async (username) => {
  const data = await apiClient(`/users/${encodeURIComponent(username)}`, {
    method: "GET",
  });
  return data;
};
