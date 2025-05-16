import React from "react";

const LogoutConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="bg-b fixed inset-0 z-50 flex h-screen w-full items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-sm rounded-lg bg-white p-6 text-black">
        <h2 className="text-lg font-bold">Are you sure you want to log out?</h2>
        <div className="mt-4 flex justify-between">
          <button
            onClick={onClose}
            className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmationModal;
