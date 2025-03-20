import React, { useState, useEffect, useRef } from "react";
import { Calculator } from "lucide-react";
import { motion } from "framer-motion";
import CustomCalculator from "./CustomCalculator";

const CalculatorUi = () => {
  // State to control the visibility of the CustomCalculator
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

  // Reference for detecting clicks outside the calculator
  const calculatorRef = useRef(null);

  // Handle click outside to close the calculator
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calculatorRef.current &&
        !calculatorRef.current.contains(event.target)
      ) {
        setIsCalculatorOpen(false);
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle opening/closing the calculator
  const toggleCalculator = () => {
    setIsCalculatorOpen(!isCalculatorOpen);
  };

  return (
    <div>
      <div
        onClick={toggleCalculator}
        className="relative flex h-[30px] cursor-pointer items-center justify-center rounded-md bg-[#FFFFFF] px-[25px] py-[2px] transition-colors duration-300 ease-in-out dark:bg-[#212121]"
      >
        <Calculator size={22} style={{ color: "#0088FF" }} />
      </div>

      {isCalculatorOpen && (
        <motion.div
          // ref={calculatorRef}
          className="fixed left-[41vw] -translate-x-1/2 -translate-y-1/2 transform shadow-lg"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          drag
          dragConstraints={{ left: -600, right: 600, top: -20, bottom: 350 }}
        >
          <CustomCalculator />
        </motion.div>
      )}
    </div>
  );
};

export default CalculatorUi;
