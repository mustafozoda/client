import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import TasksChart from "./TasksChart";
import { fetchTasks } from "../../api/tasksApi";
import SkeletonLoader from "../SkeletonLoader";
import { copyToClipboard } from "../../utils/copyUtils";
import { Copy } from "lucide-react";
import { useTranslation } from "react-i18next";

const TasksCard = () => {
  const [alertVisible, setAlertVisible] = useState(false);
  const { t } = useTranslation("overview");

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
    return <p>{t("errorLoadingTasks")}</p>;
  }

  if (!tasks || tasks.length === 0) {
    return <p>{t("noTasksAvailable")}</p>;
  }

  const taskCounts = {
    LOW: tasks.filter((task) => task.priority === "LOW").length,
    MEDIUM: tasks.filter((task) => task.priority === "MEDIUM").length,
    HIGH: tasks.filter((task) => task.priority === "HIGH").length,
  };

  const copiedText = [
    t("lowPriority", { count: taskCounts.LOW }),
    t("mediumPriority", { count: taskCounts.MEDIUM }),
    t("highPriority", { count: taskCounts.HIGH }),
  ].join("\n");

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t("tasks")}</h1>
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
