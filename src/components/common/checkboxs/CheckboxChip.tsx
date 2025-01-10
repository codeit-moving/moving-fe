"use client";

import { useState, useEffect, Children } from "react";
import clsx from "clsx";

type CheckboxChipProps = {
  text: string;
  state?: boolean;
  onStateChange?: (state: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export default function CheckboxChip({
  text,
  state = false,
  onStateChange,
  className,
  disabled = false,
}: CheckboxChipProps) {
  const checkboxChipBaseClass = clsx(
    "box-border flex flex-row justify-center items-center",
    "px-3",
    "h-9",
    "border-solid border-[1px] rounded-full shadow-[4px_4px_10px_rgba(230,230,230,0.25)]",
    "text-md font-medium",
    "pc:px-5 pc:h-[46px] pc:text-2lg",
    disabled ? "cursor-default" : "cursor-pointer",
    className
  );

  const checkboxChipActiveClass = clsx(
    checkboxChipBaseClass,
    "bg-pr-blue-50 border-pr-blue-300 text-pr-blue-300"
  );

  const checkboxChipInactiveClass = clsx(
    checkboxChipBaseClass,
    "bg-bg-100 border-grayscale-100 text-pr-blue-400"
  );

  const handleCheckboxClick = () => {
    if (!disabled && onStateChange) {
      onStateChange(!state);
    }
  };

  return (
    <div
      onClick={handleCheckboxClick}
      role="checkbox"
      aria-checked={state}
      className={state ? checkboxChipActiveClass : checkboxChipInactiveClass}
    >
      {text}
    </div>
  );
}
