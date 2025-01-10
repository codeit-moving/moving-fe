"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";

import assets from "@/variables/images";

type CheckboxProps = {
  state?: boolean;
  onStateChange?: (state: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export default function Checkbox({
  state = false,
  onStateChange,
  className,
  disabled = false,
}: CheckboxProps) {
  const checkboxClass = clsx(
    "relative w-9 h-9 cursor-pointer",
    disabled && "cursor-not-allowed",
    className
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
      aria-disabled={disabled}
      className={checkboxClass}
    >
      <Image
        src={
          state ? assets.icons.checkboxActive : assets.icons.checkboxInactive
        }
        alt="체크 박스"
        fill
      />
    </div>
  );
}
