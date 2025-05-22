import { create } from "zustand";


export const useModalStore = create((set) => ({
  isOpen: false,
  secModOpen: false,
  isExpandedModalOpen: false,
  closeModal: () => set({ isOpen: false }),
  openModal: () => set({ isOpen: true }),
  toggleSecModal: () => set((state) => ({ secModOpen: !state.secModOpen })),
  openExpandedModal: () => set({ isExpandedModalOpen: true }),
  closeExpandedModal: () => set({ isExpandedModalOpen: false }),
}));
