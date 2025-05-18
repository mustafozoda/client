import { apiClient } from "./apiClient";

/**
 * @param {number|string} taskId
 * @returns {Promise<{ comments: Comment[] }>}
 */
export const fetchCommentsByTaskId = (taskId) =>
  apiClient(`/comments/get-comments-by-task-id?taskId=${taskId}`);

/**
 * @param {{ taskId: number|string, text: string, authorId?: number|string }} comment
 * @returns {Promise<Comment>}
 */
export const addComment = (comment) =>
  apiClient("/comments/create", {
    method: "POST",
    body: JSON.stringify(comment),
  });
