import React, { useState, useEffect } from "react";
import { addTask } from "../../api/tasksApi";
import useTasksStore from "../../store/useTasksStore";
import { useLocation } from "react-router-dom";
import { fetchAllUsers } from "../../api/usersApi";

import { useQueryClient } from "@tanstack/react-query";

const TaskForm = () => {
  const { fetchAllTasks } = useTasksStore();
  const location = useLocation();
  const [users, setUsers] = useState([]);

  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    taskName: "",
    description: "",
    createdByUserId: "",
    assignedToUserId: "",
    category: "",
    priority: "LOW",
    cost: "",
    deadline: "",
  });

  useEffect(() => {
    fetchAllUsers()
      .then((fetchedUsers) => {
        setUsers(fetchedUsers);
      })
      .catch((err) => {
        console.error("Failed to load users:", err);
      });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        taskName: formData.taskName,
        description: formData.description,
        createdByUserId: parseInt(formData.createdByUserId),
        assignedToUserId: parseInt(formData.assignedToUserId),
        category: formData.category,
        priority: formData.priority,
        cost: parseFloat(formData.cost),
        deadline: formData.deadline + "+00:00",
      };

      await addTask(taskData);
      console.log("Task added successfully:", taskData);

      await queryClient.invalidateQueries({ queryKey: ["tasksWithComments"] });

      await fetchAllTasks();

      alert("Task added successfully!");

      setFormData({
        taskName: "",
        description: "",
        createdByUserId: "",
        assignedToUserId: "",
        category: "",
        priority: "LOW",
        cost: "",
        deadline: "",
      });
    } catch (error) {
      console.error("Error adding task:", error);
      alert("Failed to add task.");
    }
  };

  const capitalize = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`mx-auto min-h-[65vh] w-full space-y-6 rounded-lg bg-white p-6 dark:bg-[#212121] ${
        location.pathname === "/tasks" ? "block" : "hidden"
      } `}
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block font-medium">Task Name</label>
          <input
            type="text"
            name="taskName"
            placeholder="Enter task name"
            value={formData.taskName}
            onChange={handleChange}
            required
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
        <div>
          <label className="block font-medium">Created By</label>
          <select
            name="createdByUserId"
            value={formData.createdByUserId}
            onChange={handleChange}
            required
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-[10px] transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors focus:outline-none focus:ring-black dark:bg-[#171717] dark:text-gray-300 dark:placeholder:text-gray-300 dark:focus:ring-[#2B2B2B]"
          >
            <option value="">Select creator</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {capitalize(user.username)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block font-medium">Assigned To</label>
          <select
            name="assignedToUserId"
            value={formData.assignedToUserId}
            onChange={handleChange}
            required
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-[10px] text-black transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 focus:outline-none focus:ring-black dark:bg-[#171717] dark:text-gray-300 dark:placeholder:text-gray-300 dark:focus:ring-[#2B2B2B]"
          >
            <option value="">Select assignee</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {capitalize(user.username)}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium">Category</label>
          <input
            type="text"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleChange}
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block font-medium">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-[11px] text-black text-opacity-50 transition-all duration-300 focus:outline-none focus:ring-black dark:bg-[#171717] dark:text-gray-300 dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
        </div>
        <div>
          <label className="block font-medium">Cost ($)</label>
          <input
            type="number"
            name="cost"
            placeholder="Enter cost"
            value={formData.cost}
            onChange={handleChange}
            step="0.01"
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block font-medium">Deadline</label>
          <input
            type="datetime-local"
            name="deadline"
            value={formData.deadline}
            onChange={handleChange}
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
        <div>
          <label className="block font-medium">Task Description</label>
          <textarea
            name="description"
            placeholder="Enter task description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
      </div>

      <button
        type="submit"
        className="w-full justify-end rounded bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
