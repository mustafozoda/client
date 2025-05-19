import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { fetchCommentsByTaskId, addComment } from "../../api/commentsApi";
import { fetchUserByUsername, fetchCurrentUser } from "../../api/usersApi";

const DetailsModal = ({ item, onClose }) => {
  const isMachine = Object.prototype.hasOwnProperty.call(
    item,
    "nextMaintenanceDateTime",
  );

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const username = await fetchCurrentUser();
      if (!username) {
        console.error("No username returned from API");
        return;
      }
      fetchUserByUsername(username)
        .then((user) => setCurrentUser(user))
        .catch(() => setCurrentUser(null));
    };
    fetchUser();
  }, []);

  useEffect(() => {
    if (!isMachine) {
      fetchCommentsByTaskId(item.id)
        .then((res) => setComments(res.comment || []))
        .catch(() => setComments([]));
    }
  }, [item.id, isMachine]);

  const handleAddComment = async () => {
    if (!newComment.trim() || comments.length > 0) return;
    const payload = {
      taskId: item.id,
      creatorUserId: currentUser?.id || null, // Replace with actual user ID-------------------------------------------------
      content: newComment.trim(),
    };
    try {
      const created = await addComment(payload);
      setComments([created]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#171717]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:text-gray-300 dark:hover:text-white"
        >
          <X size={24} />
        </button>

        <h2 className="mb-6 text-center text-3xl font-semibold text-[#1976D2]">
          {isMachine ? "Machine Details" : "Task Details"}
        </h2>

        <div className="rounded-lg bg-white p-6 shadow-md dark:bg-[#212121]">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <DetailField label="ID" value={item.id} />
            {!isMachine && item.taskName && (
              <DetailField label="Name" value={item.taskName} />
            )}
            {isMachine ? (
              <>
                <DetailField label="Description" value={item.description} />
                <DetailField label="Status" value={item.status} />
                <DetailField label="Location" value={item.location} />
                <DetailField
                  label="Last Maintenance"
                  value={new Date(
                    item.lastMaintenanceDateTime,
                  ).toLocaleDateString()}
                />
                <DetailField
                  label="Next Maintenance"
                  value={new Date(
                    item.nextMaintenanceDateTime,
                  ).toLocaleDateString()}
                />
                <DetailField
                  label="Date Added"
                  value={new Date(item.dateAdded).toLocaleDateString()}
                />
              </>
            ) : (
              <>
                <DetailField label="Category" value={item.category} />
                <DetailField label="Priority" value={item.priority} />
                <DetailField label="Status" value={item.status} />
                <DetailField
                  label="Deadline"
                  value={new Date(item.deadline).toLocaleDateString()}
                />
                <DetailField
                  label="Assigned To"
                  value={item.responsibleUserId || "N/A"}
                />
                <DetailField
                  label="Created At"
                  value={new Date(item.createDate).toLocaleDateString()}
                />
                <DetailField
                  label="Cost"
                  value={item.cost != null ? `$${item.cost.toFixed(2)}` : "N/A"}
                />
              </>
            )}
          </div>
        </div>

        {!isMachine && (
          <div className="mt-6 rounded-lg bg-white p-6 shadow-md dark:bg-[#212121]">
            <h3 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
              Comment
            </h3>

            <div className="mb-4 max-h-40 space-y-3 overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800"
                  >
                    <p className="text-sm text-gray-900 dark:text-gray-100">
                      {c.content}
                    </p>
                    <span className="mt-1 block text-xs text-gray-500 dark:text-gray-400">
                      {c.commentCreatorUsername} ·{" "}
                      {new Date(c.createTime).toLocaleString()}
                    </span>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  No comments yet.
                </p>
              )}
            </div>

            {comments.length === 0 && (
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100"
                />
                <button
                  onClick={handleAddComment}
                  className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Post
                </button>
              </div>
            )}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-[#1976D2] py-3 text-white shadow-lg transition hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

const DetailField = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
      {label}
    </span>
    <span className="mt-1 text-sm text-gray-800 dark:text-gray-200">
      {value}
    </span>
  </div>
);

export default DetailsModal;
