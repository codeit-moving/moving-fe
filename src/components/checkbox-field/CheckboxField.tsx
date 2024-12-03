"use client";

import React, { useState, useEffect } from "react";
import clsx from "clsx";

import CheckboxCircle from "../common/checkboxs/CheckboxCircle";

type CheckboxFieldProps = {
  state?: boolean;
  onStateChange: (state: boolean) => void;
  text: string;
};

export default function CheckboxField({
  state = false,
  onStateChange,
  text,
}: CheckboxFieldProps) {
  const [checkState, setCheckState] = useState(state);
  const buttonBaseClass = clsx(
    "box-border flex flex-row justify-left items-center",
    "gap-2 pl-4",
    "w-[280px] h-[52px]",
    "border-solid border-[1px] rounded-[16px]",
    "text-lg text-black-400 font-semibold",
    "pc:pl-8 pc:w-[560px] pc:h-[84px] pc:text-2lg"
  );

  const buttonInactiveClass = clsx("border-gray-100", buttonBaseClass);
  const buttonActiveClass = clsx(
    "border-pr-blue-300 bg-pr-blue-50",
    buttonBaseClass
  );

  const handleCheckboxFieldClick = () => {
    setCheckState(!checkState);
  };

  useEffect(() => {
    if (onStateChange) {
      onStateChange(checkState);
    }
  }, [checkState, onStateChange]);

  return (
    <button
      onClick={handleCheckboxFieldClick}
      className={checkState ? buttonActiveClass : buttonInactiveClass}
    >
      <div style={{ pointerEvents: "none" }}>
        <CheckboxCircle state={checkState} />
      </div>
      {text}
    </button>
  );
}
