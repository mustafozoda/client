import React, { useState } from "react";
import { CalendarClock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../../api/tasksApi";
import PendingTasksModal from "./../PendingTasksModal";

const NotificationBox = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const { data } = useQuery({
    queryKey: ["tasks"],
    queryFn: fetchTasks,
    refetchInterval: 600_000,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const allTasks = Array.isArray(data?.tasks) ? data.tasks : [];
  const pendingTasks = allTasks.filter((t) => t.status === "PENDING");
  const unreadCount = pendingTasks.length;

  const displayCount =
    unreadCount > 99 ? "99+" : unreadCount > 9 ? "9+" : unreadCount;

  return (
    <>
      <div
        className="relative flex h-[30px] cursor-pointer items-center justify-center rounded-md bg-[#a1abae] px-[25px] py-[2px] transition-colors duration-300 ease-in-out dark:bg-[#212121]"
        onClick={() => setModalOpen(true)}
      >
        <CalendarClock size={22} />
        {unreadCount > 0 && (
          <span className="absolute -top-[9px] right-[10px] flex h-[30px] w-[10px] items-center justify-center rounded-full text-xs font-bold text-[#fb3131]">
            {displayCount}
          </span>
        )}
      </div>

      <PendingTasksModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        tasks={pendingTasks}
      />
    </>
  );
};

export default NotificationBox;
