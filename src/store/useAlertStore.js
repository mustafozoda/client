import { create } from "zustand";

export const useAlertStore = create((set) => ({
  message: "",
  severity: "success",
  show: false,
  showAlert: (msg, severity = "success") => set({ message: msg, severity, show: true }),
  hideAlert: () => set({ show: false }),
}));
