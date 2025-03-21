import { useAlertStore } from "../store/useAlertStore";

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text)
    .then(() => {
      useAlertStore.getState().showAlert("Copied to clipboard!");
    })
    .catch((err) => {
      console.error("Failed to copy text: ", err);
      useAlertStore.getState().showAlert("Failed to copy text", "error");
    });
};
