import React, { useState, useEffect } from "react";
import { fetchTasks } from "../api/tasksApi";
import { fetchMachines } from "../api/machinesApi";
import { fetchUserById } from "../api/usersApi";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function DashboardSummary({
  taskQuery = "",
  machineQuery = "",
}) {
  const [tasks, setTasks] = useState([]);
  const [machines, setMachines] = useState([]);
  const [page, setPage] = useState(0);
  const [modalUser, setModalUser] = useState(null);
  const [userMap, setUserMap] = useState(new Map());

  useEffect(() => {
    let isCancelled = false;

    async function loadAll() {
      // 1) Fetch tasks and machines as before
      const [{ tasks: fetchedTasks }, { machines: fetchedMachines }] =
        await Promise.all([fetchTasks(), fetchMachines()]);
      if (isCancelled) return;

      setTasks(fetchedTasks);
      setMachines(fetchedMachines);

      // 2) Build a unique list of user IDs from `createdByUserId` in tasks
      const uniqueIds = Array.from(
        new Set(
          fetchedTasks
            .map((t) => t.createdByUserId)
            .filter((id) => id !== null && id !== undefined),
        ),
      );

      // 3) For each unique ID, call fetchUserById(id) to get { id, username, ... }
      const fetches = uniqueIds.map(async (uid) => {
        const userObj = await fetchUserById(uid);
        return userObj ? [uid, userObj.username] : [uid, null];
      });
      const entries = await Promise.all(fetches);
      if (isCancelled) return;

      // 4) Build a Map<userId, username> (fall back to “User {id}” if username is missing)
      const map = new Map();
      entries.forEach(([uid, uname]) => {
        map.set(uid, uname || `User ${uid}`);
      });
      setUserMap(map);
    }

    loadAll().catch((err) => {
      console.error("Error loading tasks/machines/users:", err);
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const categoryCounts = tasks.reduce((acc, t) => {
    acc[t.category] = (acc[t.category] || 0) + 1;
    return acc;
  }, {});
  const categoryData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  const last7days = Array.from({ length: 7 }).map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return { date: key, count: 0 };
  });
  tasks.forEach((t) => {
    const day = t.createDate.slice(0, 10);
    const entry = last7days.find((e) => e.date === day);
    if (entry) entry.count++;
  });

  const tasksByUser = Object.entries(
    tasks.reduce((acc, t) => {
      const id = t.createdByUserId;
      acc[id] = acc[id] || [];
      acc[id].push(t);
      return acc;
    }, {}),
  ).map(([userId, userTasks]) => ({ userId, tasks: userTasks }));

  const cardsPerPage = 3;
  const pageCount = Math.ceil(tasksByUser.length / cardsPerPage);
  const start = page * cardsPerPage;
  const visibleUsers = tasksByUser.slice(start, start + cardsPerPage);

  const nextPage = () => setPage((p) => (p + 1) % pageCount);
  const prevPage = () => setPage((p) => (p - 1 + pageCount) % pageCount);

  const cardVariants = {
    enter: (d) => ({ x: d > 0 ? 300 : -300, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d) => ({ x: d < 0 ? 300 : -300, opacity: 0 }),
  };

  return (
    <section className="w-full space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-6 shadow dark:bg-[#171717]">
          <h3 className="mb-4 text-xl font-semibold">Tasks by Category</h3>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart
              data={categoryData}
              margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" fontSize={10} />
              <YAxis allowDecimals={false} />
              <Tooltip />

              <Bar
                dataKey="count"
                fill="#6366f1"
                barSize={35}
                radius={[4, 4, 0, 0]}
              >
                <LabelList
                  dataKey="name"
                  position="insideBottomLeft"
                  angle={-90}
                  fill="#ffffff"
                  fontSize={10}
                  offset={10}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-lg bg-white p-6 shadow dark:bg-[#171717]">
          <h3 className="mb-4 text-xl font-semibold">
            Tasks Created (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart
              data={last7days}
              margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" fontSize={10} />
              <YAxis allowDecimals={false} />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="count"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="relative rounded-lg bg-white p-4 shadow dark:bg-[#171717]">
        <h3 className="mb-2 text-xl font-semibold">Tasks by User</h3>
        {tasksByUser.length > cardsPerPage && (
          <>
            <button
              onClick={prevPage}
              className="absolute left-1 top-[112px] -translate-y-1/2 rounded-full bg-gray-200 p-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={nextPage}
              className="absolute right-1 top-[112px] -translate-y-1/2 rounded-full bg-gray-200 p-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
        <div className="flex w-full justify-between overflow-hidden">
          <AnimatePresence initial={false} custom={page}>
            <motion.div
              key={page}
              custom={page}
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.4 }}
              className="flex w-full justify-between"
            >
              {visibleUsers.map(({ userId, tasks }) => (
                <div
                  key={userId}
                  className="mx-2 flex h-32 w-[30%] flex-shrink-0 flex-col justify-between rounded-lg border bg-[#a1abae] p-4 shadow-inner dark:border-gray-700 dark:bg-gray-800"
                >
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                        {userMap.get(Number(userId)) || `User ${userId}`}
                      </span>

                      <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
                        {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
                      </span>
                    </div>
                    <ul className="space-y-1">
                      {tasks.slice(0, 2).map((t) => (
                        <li
                          key={t.id}
                          className="truncate text-sm text-gray-700 dark:text-gray-300"
                        >
                          {t.taskName}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {tasks.length > 2 && (
                    <button
                      onClick={() => setModalUser({ userId, tasks })}
                      className="mt-2 self-start text-xs font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      Show more
                    </button>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {modalUser && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="w-11/12 max-w-md rounded-lg bg-white p-6 dark:bg-gray-800">
              <h4 className="mb-4 text-lg font-semibold">
                {userMap.get(Number(modalUser.userId)) ||
                  `User ${modalUser.userId}`}{" "}
                Tasks
              </h4>

              <ul className="mb-4 max-h-64 divide-y divide-gray-200 overflow-y-auto dark:divide-gray-700">
                {modalUser.tasks.map((t) => (
                  <li
                    key={t.id}
                    className="py-2 text-sm text-gray-700 dark:text-gray-300"
                  >
                    {t.taskName}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => setModalUser(null)}
                className="mt-2 rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export function UserTasksModal({ modalUser, setModalUser }) {
  return (
    <Transition appear show={!!modalUser} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={() => setModalUser(null)}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-60"
            leave="ease-in duration-200"
            leaveFrom="opacity-60"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black dark:bg-gray-900" />
          </Transition.Child>

          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95 translate-y-4"
            enterTo="opacity-100 scale-100 translate-y-0"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100 translate-y-0"
            leaveTo="opacity-0 scale-95 translate-y-4"
          >
            <Dialog.Panel className="my-8 inline-block w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-semibold text-gray-900 dark:text-gray-100"
                >
                  {" "}
                  {userMap.get(Number(modalUser?.userId)) ||
                    `User ${modalUser?.userId}`}{" "}
                  Tasks{" "}
                </Dialog.Title>
                <button
                  onClick={() => setModalUser(null)}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none dark:hover:text-gray-300"
                >
                  <XIcon className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-4">
                <ul className="max-h-64 space-y-2 overflow-y-auto">
                  {modalUser?.tasks.map((t) => (
                    <li
                      key={t.id}
                      className="rounded-md bg-gray-100 px-4 py-2 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                    >
                      {t.taskName}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6 text-right">
                <button
                  type="button"
                  onClick={() => setModalUser(null)}
                  className="inline-flex justify-center rounded-md bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none dark:bg-indigo-200 dark:text-indigo-900 dark:hover:bg-indigo-300"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
