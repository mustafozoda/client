import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, CalendarDays } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import MachineForm from "./MachineForm";
import TaskForm from "./TaskForm";
import { useLocation } from "react-router-dom";

const FormContainer = () => {
  const [showBox1, setShowBox1] = useState(true);
  const { isOpen, closeModal } = useModalStore();
  const { secModOpen, toggleSecModal } = useModalStore();
  const location = useLocation();

  // Set initial state based on current route
  useEffect(() => {
    if (location.pathname === "/tasks") {
      setShowBox1(false); // Show tasks form if we're on /tasks page
    } else {
      setShowBox1(true); // Default to showing machines form
    }
  }, [location.pathname]);

  return (
    <div className="flex h-full w-[95%] flex-col items-center justify-start">
      <div className="flex w-full items-center justify-between">
        <div>
          <CalendarDays
            className="cursor-pointer"
            onClick={(e) => {
              toggleSecModal();
              e.stopPropagation();
            }}
          />
        </div>
        <div>
          <X onClick={closeModal} className="cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setShowBox1(true)}
          className={`pb-2 text-lg font-semibold ${
            showBox1
              ? "border-blue-500 text-blue-500 underline"
              : "text-gray-500 opacity-50"
          }`}
        >
          Add New Machine
        </button>
        <button
          onClick={() => setShowBox1(false)}
          className={`pb-2 text-lg font-semibold ${
            !showBox1
              ? "border-blue-500 text-blue-500 underline"
              : "text-gray-500 opacity-50"
          }`}
        >
          Add New Task
        </button>
      </div>

      <div className="relative h-full w-full">
        <motion.div
          className="absolute h-full w-full"
          initial={{ x: 0 }}
          animate={{
            x: showBox1 ? 0 : -600,
          }}
          transition={{ duration: 0.5 }}
        >
          <MachineForm />
        </motion.div>

        <motion.div
          className="absolute h-full w-full"
          initial={{ x: 600 }}
          animate={{
            x: showBox1 ? 600 : 0,
          }}
          transition={{ duration: 0.5 }}
        >
          <TaskForm />
        </motion.div>
      </div>
      <div className="h-full w-full"></div>
    </div>
  );
};

export default FormContainer;
