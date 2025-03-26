import { useState, useEffect } from "react";

const CustomCalculator = () => {
  const [input, setInput] = useState("0");

  const evaluateExpression = (expr) => {
    try {
      let formattedInput = expr.replace(
        /(\d+\.?\d*)%/g,
        (_, number, index, str) => {
          let prevMatch = str.substring(0, index).match(/(\d+\.?\d*)([+\-*/])/);

          if (prevMatch) {
            let prevNumber = prevMatch[1];
            return `(${prevNumber} * ${parseFloat(number) / 100})`;
          }

          return `(${parseFloat(number) / 100})`;
        },
      );

      return new Function(`return ${formattedInput}`)();
    } catch {
      return "Error";
    }
  };

  const handleClick = (value) => {
    if (value === "C") {
      setInput("0");
    } else if (value === "=") {
      const result = evaluateExpression(input);
      setInput(isNaN(result) ? "Error" : result.toString());
    } else if (value === "√") {
      const result = Math.sqrt(evaluateExpression(input));
      setInput(isNaN(result) ? "Error" : result.toString());
    } else if (value === "⌫") {
      setInput((prev) => (prev.length > 1 ? prev.slice(0, -1) : "0"));
    } else if (value === "%") {
      setInput((prev) => prev + "%");
    } else {
      setInput((prev) => (prev === "0" ? value : prev + value));
    }
  };

  const handleKeyPress = (event) => {
    const { key } = event;
    if (/[0-9+\-*/.%]/.test(key)) {
      handleClick(key === "Enter" ? "=" : key);
    } else if (key === "Backspace") {
      handleClick("⌫");
    } else if (key === "Escape") {
      setInput("0");
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const buttons = [
    ["⌫", "√", "%", "/"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["0", ".", "=", "C"],
  ];

  return (
    <div className="mx-auto max-w-xs rounded-lg bg-gray-800 p-5 text-white shadow-lg">
      <div className="mb-3 rounded bg-gray-900 p-3 text-right text-xl">
        {input}
      </div>
      <div className="m-2 mx-auto h-[2.5vh] w-full rounded bg-gray-700 px-[10px] text-right">
        CALCULATOR
      </div>
      <div className="grid gap-2">
        {buttons.map((row, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-4 gap-2">
            {row.map((btn) => (
              <button
                key={btn}
                className="rounded bg-gray-700 p-3 text-xl hover:bg-gray-600 active:bg-gray-500"
                onClick={() => handleClick(btn)}
              >
                {btn}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalculator;
