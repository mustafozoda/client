import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CalendarDays } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import { useLocation, useNavigate } from "react-router-dom";
import MachineForm from "./machinesPage/MachineForm";
import TaskForm from "../components/tasksPage/TaskForm";

function Button({ children, variant = "default", className = "", ...props }) {
  const base =
    "px-4 py-2 rounded font-medium transition-colors focus:outline-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100",
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`rounded bg-white shadow dark:bg-[#212121] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "", ...props }) {
  return (
    <div className={`px-4 py-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "", ...props }) {
  return (
    <h2 className={`text-lg font-bold ${className}`} {...props}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "", ...props }) {
  return (
    <div className={`px-4 py-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export default function CustomModal() {
  const { isExpandedModalOpen, closeExpandedModal } = useModalStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(() => {
    if (location.pathname.includes("/tasks")) {
      return "task";
    }
    if (location.pathname.includes("/machines")) {
      return "machine";
    }
    return "machine";
  });

  useEffect(() => {
    if (location.pathname.includes("/tasks")) {
      setActiveTab("task");
    } else if (location.pathname.includes("/machines")) {
      setActiveTab("machine");
    }
  }, [location.pathname]);

  const goToTasks = () => {
    navigate("/tasks");
  };

  const goToMachines = () => {
    navigate("/machines");
  };

  return (
    <AnimatePresence>
      {isExpandedModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40 bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeExpandedModal}
          />

          {/* Modal Container */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            onClick={closeExpandedModal}
          >
            <Card
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl overflow-hidden rounded-2xl shadow-lg"
            >
              <CardHeader className="flex items-center justify-between p-4">
                <div className="flex items-center gap-2">
                  {/* <CalendarDays className="cursor-pointer hover:text-blue-600" /> */}
                  <CardTitle className="text-xl">
                    {activeTab === "machine"
                      ? "Add New Machine"
                      : "Add New Task"}
                  </CardTitle>
                </div>
                <X
                  className="cursor-pointer hover:text-red-500"
                  onClick={closeExpandedModal}
                />
              </CardHeader>

              {/* Tabs */}
              <div className="flex border-b">
                <button
                  onClick={() => {
                    setActiveTab("machine");
                    goToMachines();
                  }}
                  className={`flex-1 py-2 text-center font-medium transition-colors ${
                    activeTab === "machine"
                      ? "border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Machine
                </button>
                <button
                  onClick={() => {
                    setActiveTab("task");
                    goToTasks();
                  }}
                  className={`flex-1 py-2 text-center font-medium transition-colors ${
                    activeTab === "task"
                      ? "border-blue-500 text-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Task
                </button>
              </div>

              {/* Content */}
              <CardContent className="p-6">
                {activeTab === "machine" ? <MachineForm /> : <TaskForm />}
              </CardContent>

              {/* Footer buttons */}
              <div className="flex justify-end gap-3 p-4">
                <Button variant="outline" onClick={closeExpandedModal}>
                  Cancel
                </Button>
                {/* Submit button, uncomment if needed */}
                {/* <Button
                  type="submit"
                  form={activeTab === "machine" ? "machine-form" : "task-form"}
                >
                  {activeTab === "machine" ? "Save Machine" : "Save Task"}
                </Button> */}
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
