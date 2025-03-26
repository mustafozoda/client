import { create } from "zustand";

const useMachineSearchStore = create((set) => ({
  searchTerm: "",
  selectedStatuses: [],

  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedStatuses: (statuses) => set({ selectedStatuses: statuses }),
}));

export default useMachineSearchStore;
