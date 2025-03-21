import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TasksChart from "./TasksChart";
import { fetchTasks } from "../../api/tasksApi";
import SkeletonLoader from "../../components/SkeletonLoader"; // Make sure to import your SkeletonLoader component
import { copyToClipboard } from "../../utils/copyUtils";
import { Copy } from "lucide-react";

const TasksCard = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  // If loading or error, show SkeletonLoader or loading message
  if (isLoading || error) {
    if (error) {
      console.error("Error loading tasks:", error); // Log error to console
    }
    return <SkeletonLoader />; // Show SkeletonLoader in case of loading or error
  }

  // Count tasks by priority
  const taskCounts = {
    Urgent: tasks.filter((task) => task.priority === "Urgent").length,
    High: tasks.filter((task) => task.priority === "High").length,
    Normal: tasks.filter((task) => task.priority === "Normal").length,
    Low: tasks.filter((task) => task.priority === "Low").length,
  };

  const copiedText = `Urgent: ${taskCounts.Urgent} tasks\nHigh: ${taskCounts.High} tasks\nNormal: ${taskCounts.Normal} tasks\nLow: ${taskCounts.Low} tasks`;

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Tasks</h1>
          <span className="text-4xl font-bold text-blue-500">
            {tasks.length}
          </span>
        </div>
        <div className="cursor-pointer">
          <Copy size={30} onClick={() => copyToClipboard(copiedText)} />
        </div>
      </div>
      <div>
        <TasksChart />
      </div>
    </div>
  );
};

export default TasksCard;
