import { create } from "zustand";
import { fetchTasks } from "../api/tasksApi";

const useTasksStore = create((set) => ({
  tasks: [],
  loading: false,
  fetchAllTasks: async () => {
    set({ loading: true });
    try {
      const tasks = await fetchTasks();
      set({ tasks });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useTasksStore;
