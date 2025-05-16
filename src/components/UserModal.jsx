// components/UserModal.jsx
import React from "react";
import ReactDOM from "react-dom";
import { XCircle } from "lucide-react";

const UserModal = ({ user, isOpen, onClose }) => {
  if (!isOpen || !user) return null;

  return ReactDOM.createPortal(
    <>
      {/* backdrop */}
      <div className="fixed inset-0 z-50 bg-black/60" onClick={onClose} />

      {/* modal box */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* close icon */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <XCircle size={24} />
        </button>

        <h2 className="mb-4 text-center text-2xl font-bold text-gray-900 dark:text-gray-100">
          User Details
        </h2>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-gray-800 dark:text-gray-200">
          <div className="font-semibold">ID:</div>
          <div>{user.id}</div>

          <div className="font-semibold">Username:</div>
          <div>{user.username}</div>

          <div className="font-semibold">Email:</div>
          <div>{user.email}</div>
        </div>

        {/* <div className="mt-6 flex justify-center">
          <button
            onClick={onClose}
            className="rounded-full bg-blue-600 px-6 py-2 text-white shadow transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Close
          </button>
        </div> */}
      </div>
    </>,
    document.body,
  );
};

export default UserModal;
