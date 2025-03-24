import { create } from "zustand";


export const useModalStore = create((set) => ({
  isOpen: false,
  secModOpen: false,
  closeModal: () => set({ isOpen: false }),
  openModal: () => set({ isOpen: true }),
  toggleSecModal: () => set((state) => ({ secModOpen: !state.secModOpen })),
}));
