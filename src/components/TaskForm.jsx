import { useState } from "react";
import { addTask } from "../api/tasksApi";
import useTasksStore from "../store/useTasksStore";

const TaskForm = () => {
  const { fetchAllTasks } = useTasksStore();
  const [formData, setFormData] = useState({
    description: "",
    createdByUserId: "",
    assignedToUserId: "",
    category: "",
    priority: "LOW",
    cost: "",
    deadline: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const taskData = {
        description: formData.description,
        createdByUserId: parseInt(formData.createdByUserId),
        assignedToUserId: parseInt(formData.assignedToUserId),
        category: formData.category,
        priority: formData.priority,
        cost: parseFloat(formData.cost),
        deadline: formData.deadline + "+00:00", // Ensure correct deadline format
      };

      // Add task with default status
      await addTask(taskData);
      await fetchAllTasks(); // Refresh tasks list
      alert("Task added successfully!");
      setFormData({
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

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full space-y-6 rounded-lg bg-white p-6 dark:bg-[#212121]"
      autoComplete="off"
    >
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
        <div>
          <label className="block font-medium">Created By (User ID)</label>
          <input
            type="number"
            name="createdByUserId"
            placeholder="Enter creator user ID"
            value={formData.createdByUserId}
            onChange={handleChange}
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block font-medium">Assigned To (User ID)</label>
          <input
            type="number"
            name="assignedToUserId"
            placeholder="Enter assigned user ID"
            value={formData.assignedToUserId}
            onChange={handleChange}
            className="w-full rounded-[5px] border-none bg-[#a1abae] p-2 transition-all duration-300 placeholder:text-black placeholder:text-opacity-50 placeholder:transition-colors placeholder:duration-300 focus:outline-none focus:ring-black dark:bg-[#171717] dark:placeholder:text-gray-300 placeholder:dark:text-opacity-50 dark:focus:ring-[#2B2B2B]"
          />
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

      <button
        type="submit"
        className="w-full rounded bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600"
      >
        Add Task
      </button>
    </form>
  );
};

export default TaskForm;
