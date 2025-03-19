import React from "react";
import { useQuery } from "@tanstack/react-query";
import TasksChart from "./TasksChart";
import { fetchTasks } from "../../api/tasksApi";

const TasksCard = () => {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
  });

  if (isLoading) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks</div>;
  }

  const taskCount = tasks ? tasks.length : 0;

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <h1 className="text-xl font-semibold">Tasks</h1>
        <span className="text-4xl font-bold text-blue-500">{taskCount}</span>
      </div>
      <div>
        <TasksChart />
      </div>
    </div>
  );
};

export default TasksCard;
