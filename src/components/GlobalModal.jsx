import { motion, AnimatePresence } from "framer-motion";
import { useModalStore } from "../store/useModalStore";
import DateCalendarComponent from "./DateCalendarComponent";
import FormContainer from "./FormContainer";

export default function GlobalModal() {
  const { isOpen, closeModal } = useModalStore();
  const { secModOpen, toggleSecModal } = useModalStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay for First Modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 left-0 top-0 z-50 h-[100vh] w-[100vw] bg-black"
            onClick={closeModal}
          />

          {/* First Modal */}
          <motion.div
            initial={{ x: "80%", opacity: 1 }}
            animate={{ x: "0%", opacity: 1 }}
            exit={{ x: "0%", opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-end p-[1%]"
            onClick={closeModal}
          >
            <motion.div
              initial={{ x: "300%", opacity: 0 }}
              animate={{ x: "0%", opacity: 1 }}
              exit={{ x: "180%", opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="flex h-[100%] w-[40%] flex-col items-center justify-start overflow-hidden rounded-[10px] bg-[#FFFFFF] py-[1%] shadow-xl dark:border-[#212121] dark:bg-[#212121]"
            >
              <FormContainer />

              {/* "------------------------Place for form-------------------------" */}
            </motion.div>
          </motion.div>

          {/* Second Modal */}
          <AnimatePresence>
            {secModOpen && (
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "0%", opacity: 1 }}
                exit={{ x: "-100%", opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className={`fixed inset-0 z-50 flex items-end p-[1%]`}
                onClick={toggleSecModal}
              >
                <motion.div
                  initial={{ x: "0%", opacity: 0 }}
                  animate={{ x: "0%", opacity: 1 }}
                  exit={{ x: "0%", opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  onClick={(e) => e.stopPropagation()}
                  className="rounded-[5px] border bg-[#FFFFFF] p-2 dark:border-[#212121] dark:bg-[#171717]"
                >
                  <DateCalendarComponent />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
}
