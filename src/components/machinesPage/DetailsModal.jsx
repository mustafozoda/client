import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  X,
  IdCard,
  CircleUser,
  FileText,
  MapPin,
  CalendarCheck,
  CalendarPlus,
  CalendarDays,
  Tag,
  Flag,
  User,
  DollarSign,
  ClipboardList,
} from "lucide-react";
import { fetchCommentsByTaskId, addComment } from "../../api/commentsApi";
import { fetchUserByUsername, fetchCurrentUser } from "../../api/usersApi";

const getIconColor = [
  "#1976D2", // blue
  "#E53935", // red
  "#43A047", // green
  "#FBC02D", // yellow
  "#8E24AA", // purple
  "#00ACC1", // teal
  "#F57C00", // orange
  "#3949AB", // indigo
  "#D81B60", // pink
  "#00897B", // cyan
  "#C0CA33", // lime
  "#6D4C41", // brown
  "#7E57C2", // deep purple
];

const DetailsModal = ({ item, onClose }) => {
  const isMachine = Object.prototype.hasOwnProperty.call(
    item,
    "nextMaintenanceDateTime",
  );

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (isMachine) return;

    const loadAll = async () => {
      try {
        const [commentRes, username] = await Promise.all([
          fetchCommentsByTaskId(item.id),
          fetchCurrentUser(),
        ]);

        setComments(commentRes.comment || []);

        if (username) {
          try {
            const user = await fetchUserByUsername(username);
            setCurrentUser(user);
          } catch {
            setCurrentUser(null);
          }
        }
      } catch (err) {
        console.error("Failed to load comments or user", err);
        setComments([]);
      }
    };

    loadAll();
  }, [item.id, isMachine]);

  const handleAddComment = async () => {
    const text = newComment.trim();
    if (!text || comments.length > 0) return;

    const payload = {
      taskId: item.id,
      creatorUserId: currentUser?.id || null,
      content: text,
    };

    try {
      const created = await addComment(payload);

      const now = new Date().toISOString();
      const withMeta = {
        id: created.id,
        content: text,
        commentCreatorUsername: currentUser?.username || "You",
        createTime: created.createTime || now,
      };

      setComments([withMeta]);
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
      className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 200, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl rounded-2xl bg-[#a1abae] p-6 shadow-2xl dark:bg-[#171717]"
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
            <DetailField
              label="ID"
              value={item.id}
              icon={<IdCard color={getIconColor[0]} />}
            />
            {!isMachine && item.taskName && (
              <DetailField
                label="Name"
                value={item.taskName}
                icon={<CircleUser color={getIconColor[1]} />}
              />
            )}

            {isMachine ? (
              <>
                <DetailField
                  label="Name"
                  value={item.name}
                  icon={<CircleUser color={getIconColor[2]} />}
                />
                <DetailField
                  label="Description"
                  value={item.description}
                  icon={<FileText color={getIconColor[3]} />}
                />
                <DetailField
                  label="Status"
                  value={item.status}
                  icon={<ClipboardList color={getIconColor[4]} />}
                />
                <DetailField
                  label="Location"
                  value={item.location}
                  icon={<MapPin color={getIconColor[5]} />}
                />
                <DetailField
                  label="Last Maintenance"
                  value={new Date(
                    item.lastMaintenanceDateTime,
                  ).toLocaleDateString()}
                  icon={<CalendarCheck color={getIconColor[6]} />}
                />
                <DetailField
                  label="Next Maintenance"
                  value={new Date(
                    item.nextMaintenanceDateTime,
                  ).toLocaleDateString()}
                  icon={<CalendarPlus color={getIconColor[7]} />}
                />
                <DetailField
                  label="Date Added"
                  value={new Date(item.dateTimeAdded).toLocaleDateString()}
                  icon={<CalendarDays color={getIconColor[8]} />}
                />
              </>
            ) : (
              <>
                <DetailField
                  label="Category"
                  value={item.category}
                  icon={<Tag color={getIconColor[9]} />}
                />
                <DetailField
                  label="Priority"
                  value={item.priority}
                  icon={<Flag color={getIconColor[10]} />}
                />
                <DetailField
                  label="Status"
                  value={item.status}
                  icon={<ClipboardList color={getIconColor[11]} />}
                />
                <DetailField
                  label="Deadline"
                  value={new Date(item.deadline).toLocaleDateString()}
                  icon={<CalendarCheck color={getIconColor[12]} />}
                />
                <DetailField
                  label="Assigned To"
                  value={item.responsibleUserId || "N/A"}
                  icon={<User color={getIconColor[3]} />}
                />
                <DetailField
                  label="Created At"
                  value={new Date(item.createDate).toLocaleDateString()}
                  icon={<CalendarDays color={getIconColor[4]} />}
                />
                <DetailField
                  label="Cost"
                  value={item.cost != null ? `$${item.cost.toFixed(2)}` : "N/A"}
                  icon={<DollarSign color={getIconColor[5]} />}
                />
              </>
            )}
          </div>
        </div>

        {!isMachine && (
          <div className="mt-6 rounded-lg bg-white p-4 shadow-md dark:bg-[#212121]">
            <div className="max-h-40 space-y-3 overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((c) => (
                  <div
                    key={c.id}
                    className="rounded-md border border-gray-200 bg-[#a1abae] p-3 dark:border-gray-700 dark:bg-gray-800"
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
                  {/* No comments yet. */}
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

const DetailField = ({ icon, label, value }) => (
  <div className="flex items-start justify-start gap-2">
    <div className="flex min-h-[40px] min-w-[40px] items-center justify-center rounded-md bg-[#a1abae] dark:bg-[#171717]">
      {icon}
    </div>
    <div className="flex flex-col">
      <span className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400">
        {label}
      </span>
      <span className="mt-1 text-sm text-gray-800 dark:text-gray-200">
        {value}
      </span>
    </div>
  </div>
);

export default DetailsModal;
