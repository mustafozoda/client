import React, { useState } from "react";
import ReactDOM from "react-dom";
import { X, ArrowLeft, Key, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { resetPassword } from "../api/usersApi";

const UserModal = ({ user, authToken, isOpen, onClose }) => {
  const [view, setView] = useState("details");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleReset = async () => {
    if (!newPassword) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await resetPassword(newPassword, authToken);
      setSuccess("Password updated successfully.");
      setNewPassword("");
      setView("details");
    } catch (err) {
      console.error("resetPassword error:", err);
      setError(err.message || "Error resetting password.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !user) return null;

  return ReactDOM.createPortal(
    <>
      <motion.div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#212121]"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => {
              setView("details");
              onClose();
              setSuccess("");
            }}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <X size={24} />
          </button>

          {view === "details" ? (
            <>
              <h2 className="mb-4 text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
                User Details
              </h2>

              {success && (
                <div className="mb-4 flex items-center justify-center space-x-2 rounded-lg bg-green-100 px-4 py-2 text-green-800">
                  <CheckCircle size={20} />
                  <span className="font-medium">{success}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3 text-gray-800 dark:text-gray-200">
                <div className="font-medium">ID:</div>
                <div>{user.id}</div>

                <div className="font-medium">Username:</div>
                <div>{user.username}</div>

                <div className="font-medium">Email:</div>
                <div>{user.email}</div>
              </div>

              <div className="mt-6 flex justify-end">
                {/* <button
                  onClick={() => setView("reset")}
                  className="inline-flex items-center rounded-[5px] bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <Key size={16} className="mr-2" />
                  Reset Password
                </button> */}
              </div>
            </>
          ) : (
            <>
              <div className="mb-4 flex items-center">
                <button
                  onClick={() => setView("details")}
                  className="mr-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  <ArrowLeft size={20} />
                </button>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Reset Password
                </h2>
              </div>

              <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-[#171717] dark:text-gray-100"
              />

              {error && (
                <p className="mt-2 text-sm text-red-600 dark:text-red-400">
                  {error}
                </p>
              )}

              <button
                onClick={handleReset}
                disabled={loading || !newPassword}
                className={`mt-4 w-full rounded-[5px] px-4 py-2 text-sm font-semibold shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                  loading || !newPassword
                    ? "cursor-not-allowed bg-gray-400"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {loading ? "Updating…" : "Update Password"}
              </button>
            </>
          )}
        </div>
      </motion.div>
    </>,
    document.body,
  );
};

export default UserModal;
