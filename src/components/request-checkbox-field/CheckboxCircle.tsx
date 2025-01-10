import React from "react";

interface CheckboxCircleProps {
  state: boolean;
}

const CheckboxCircle: React.FC<CheckboxCircleProps> = ({ state }) => {
  return (
    <div
      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center
      transition-all duration-200
      ${
        state
          ? "border-pr-blue-300 bg-pr-blue-300"
          : "border-line-200 border-solid border-[1px] bg-none"
      }`}
    >
      {state && (
        <svg
          className="w-3 h-3 text-white transform scale-100 transition-transform duration-200"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
    </div>
  );
};

export default CheckboxCircle;
