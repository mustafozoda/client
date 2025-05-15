import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ModalExample() {
  const [showFirst, setShowFirst] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  return (
    <div
      onClick={() => {
        // setShowFirst(false);
        // setShowSecond(false);
        // setShowThird(false);
      }}
      className="relative flex h-screen items-center justify-center bg-gray-900 text-white"
    >
      <button
        className="rounded bg-blue-500 p-4"
        onClick={(e) => {
          e.stopPropagation();
          setShowFirst(true);
        }}
      >
        Open Modal
      </button>

      <AnimatePresence>
        {(showFirst || showSecond || showThird) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black"
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showFirst && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "80%" }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.5 }}
            className="fixed right-[260px] top-[100px] z-10 h-[80vh] w-[20vw] bg-gray-800 p-4 shadow-lg"
          >
            <button
              className="mb-4 rounded bg-red-500 p-2"
              onClick={() => setShowFirst(false)}
            >
              Close
            </button>
            <button
              className="rounded bg-green-500 p-2"
              onClick={() => {
                setShowThird(false);
                setShowSecond(true);
              }}
            >
              Open Second Modal
            </button>
            <button
              className="rounded bg-purple-500 p-2"
              onClick={() => {
                setShowFirst(true);
                setShowSecond(false);
                setShowThird(true);
              }}
            >
              Open Third Modal
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSecond && (
          <motion.div
            initial={{ x: "200%" }}
            animate={{ x: "90%" }}
            exit={{ x: "300%" }}
            transition={{ duration: 0.5 }}
            className="fixed right-[620px] top-[100px] z-20 h-[80vh] w-[20vw] bg-gray-700 p-4 shadow-lg"
          >
            <button
              className="mb-4 rounded bg-red-500 p-2"
              onClick={() => setShowSecond(false)}
            >
              Close Second
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showThird && (
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: "50%" }}
            exit={{ y: "200%" }}
            transition={{ duration: 0.5 }}
            className="fixed bottom-[220px] right-[670px] z-30 h-[50vh] w-[20vw] bg-gray-600 p-4 shadow-lg"
          >
            <button
              className="rounded bg-red-500 p-2"
              onClick={() => setShowThird(false)}
            >
              Close Third
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
