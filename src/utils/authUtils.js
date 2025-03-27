export const getStoredUser = () => {
  const storedUser = sessionStorage.getItem("user");
  if (!storedUser) {
    console.warn("No user data found in sessionStorage.");
    return null;
  }
  try {
    return JSON.parse(storedUser);
  } catch (error) {
    console.error("Error parsing user data:", error);
    return null;
  }
};
