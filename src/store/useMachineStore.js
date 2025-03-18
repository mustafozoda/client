import { create } from "zustand";
import { fetchMachines } from "../api/machinesApi";

const useMachineStore = create((set) => ({
  machines: [],
  loading: false,
  fetchAllMachines: async () => {
    set({ loading: true });
    try {
      const machines = await fetchMachines();
      set({ machines });
    } catch (error) {
      console.error("Error fetching machines:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useMachineStore;
