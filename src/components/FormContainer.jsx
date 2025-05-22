import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, CalendarDays, Expand } from "lucide-react";
import { useModalStore } from "../store/useModalStore";
import MachineForm from "./machinesPage/MachineForm";
import TaskForm from "../components/tasksPage/TaskForm";
import { useLocation, useNavigate } from "react-router-dom";
const FormContainer = () => {
  const openModal = useModalStore((s) => s.openModal);
  const [showBox1, setShowBox1] = useState(true);
  const { isOpen, closeModal } = useModalStore();
  const { openExpandedModal } = useModalStore();
  const { secModOpen, toggleSecModal } = useModalStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname === "/tasks") {
      setShowBox1(false);
    } else {
      setShowBox1(true);
    }
  }, [location.pathname]);

  const goToTasks = () => {
    navigate("/tasks");
  };

  const goToMachines = () => {
    navigate("/machines");
  };

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
        <div className="flex items-center gap-2">
          <Expand
            onClick={() => {
              openExpandedModal();
              closeModal();
            }}
            className="cursor-pointer"
            size={18}
          />
          <X onClick={closeModal} className="cursor-pointer" />
        </div>
      </div>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => {
            setShowBox1(true);
            goToMachines();
          }}
          className={`pb-2 text-lg font-semibold ${
            showBox1
              ? "border-blue-500 text-blue-500 underline"
              : "text-gray-500 opacity-50"
          }`}
        >
          Add New Machine
        </button>
        <button
          onClick={() => {
            setShowBox1(false);
            goToTasks();
          }}
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
          // animate={{
          //   x: showBox1 ? 0 : -1000,
          // }}
          transition={{ duration: 0.5 }}
        >
          <MachineForm />
        </motion.div>

        <motion.div
          className="absolute h-full w-full"
          initial={{ x: 0 }}
          // animate={{
          //   x: showBox1 ? 600 : 0,
          // }}
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
