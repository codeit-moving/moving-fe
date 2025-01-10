import React from "react";
import clsx from "clsx";
import CheckboxCircle from "./CheckboxCircle";

interface CheckboxFieldProps {
  text: string;
  value: string;
  isSelected: boolean;
  onSelect: (value: string) => void;
  disabled?: boolean;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  text,
  value,
  isSelected,
  onSelect,
  disabled = false,
}) => {
  const buttonBaseClass = clsx(
    "box-border flex flex-row justify-left items-center",
    "gap-2 pl-4",
    "w-[280px] h-[52px]",
    "border-solid border-[1px] rounded-[16px]",
    "text-lg text-black-400 font-semibold",
    "pc:pl-8 pc:w-[560px] pc:h-[84px] pc:text-2lg",

    disabled && "cursor-not-allowed opacity-50"
  );

  const buttonClass = clsx(
    buttonBaseClass,
    isSelected
      ? "border-pr-blue-300 border-solid bg-pr-blue-50"
      : "border-gray-100 border-solid"
  );

  const handleClick = (e: React.MouseEvent) => {
    if (!disabled) {
      onSelect(value);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={buttonClass}
      role="radio"
      aria-checked={isSelected}
      disabled={disabled}
      aria-disabled={disabled}
    >
      <div className="pointer-events-none">
        <CheckboxCircle state={isSelected} />
      </div>
      {text}
    </button>
  );
};

export default CheckboxField;
