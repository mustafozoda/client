import React, { useEffect, useState } from "react";
import { fetchTasks } from "../../api/tasksApi";
import SkeletonLoader from "../SkeletonLoader";
import { useQuery } from "@tanstack/react-query";
import { Copy } from "lucide-react";
import { copyToClipboard } from "../../utils/copyUtils";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
const TasksStatusCnt = () => {
  const { t } = useTranslation("overview");

  const {
    data: responseData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    refetchInterval: 1000,
  });

  const [taskNames, setTaskNames] = useState([]);
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    if (Array.isArray(responseData?.tasks)) {
      const pendingTasks = responseData.tasks.filter(
        (task) => task.status === "PENDING",
      );
      setTaskNames(pendingTasks.map((task) => task.description));
    }
  }, [responseData]);

  useEffect(() => {
    if (taskNames.length > 0) {
      const timer = setInterval(() => {
        setTaskIndex((prev) => (prev + 1) % taskNames.length);
      }, 3000);

      return () => clearInterval(timer);
    }
  }, [taskNames]);

  if (isLoading) return <SkeletonLoader />;

  if (error) {
    console.log("Error loading tasks:", error);
  }

  const tasksStatusPending = Array.isArray(responseData?.tasks)
    ? responseData.tasks.filter((task) => task.status === "PENDING").length
    : 0;
  return (
    <div className="h-full w-full">
      {isLoading || error ? (
        <div className="flex h-full w-full items-center justify-center">
          <SkeletonLoader
            hideAvatar={false}
            hideTitle={false}
            hideSubheader={false}
            hideContent={false}
            hideRect={true}
          />
        </div>
      ) : (
        <div className="flex min-h-full min-w-full flex-col justify-between p-[10px]">
          <div className="flex min-h-full justify-between">
            <div className="overflow-hidden">
              <h1 className="truncate">{t("awaitingAction")}</h1>

              <span className="text-[42px] text-blue-500">
                {tasksStatusPending}
              </span>
            </div>
            <div>
              <span className="cursor-pointer">
                <Copy
                  onClick={() => copyToClipboard(tasksStatusPending)}
                  size={24}
                />
              </span>
            </div>
          </div>
          <div className="flex h-full w-full items-center">
            <div className="flex overflow-hidden">
              <motion.div
                key={taskIndex}
                className="whitespace-nowrap text-sm text-[#FFBB28]"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 2.5 }}
              >
                {taskNames[taskIndex]}
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TasksStatusCnt;
