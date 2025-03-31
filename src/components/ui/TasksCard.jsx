import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TasksChart from "./TasksChart";
import { fetchTasks } from "../../api/tasksApi";
import SkeletonLoader from "../../components/SkeletonLoader";
import { copyToClipboard } from "../../utils/copyUtils";
import { Copy } from "lucide-react";

const TasksCard = () => {
  const [alertVisible, setAlertVisible] = useState(false);

  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  const tasks = Array.isArray(responseData?.tasks) ? responseData.tasks : [];

  // console.log(tasks);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (error) {
    console.error("Error loading tasks:", error);
    return <p>Failed to load tasks. Please try again later.</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p>No tasks available.</p>;
  }

  const taskCounts = {
    LOW: tasks.filter((task) => task.priority === "LOW").length,
    MEDIUM: tasks.filter((task) => task.priority === "MEDIUM").length,
    HIGH: tasks.filter((task) => task.priority === "HIGH").length,
  };

  const copiedText = `Low: ${taskCounts.LOW} tasks\nMedium: ${taskCounts.MEDIUM} tasks\nHigh: ${taskCounts.HIGH} tasks`;

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
