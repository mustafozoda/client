import { create } from "zustand";

const useMachineSearchStore = create((set) => ({
  searchTerm: "",
  selectedStatuses: [],
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedStatuses: (updater) =>
    set((state) => ({
      selectedStatuses:
        typeof updater === "function" ? updater(state.selectedStatuses) : updater,
    })),
}));

export default useMachineSearchStore;
