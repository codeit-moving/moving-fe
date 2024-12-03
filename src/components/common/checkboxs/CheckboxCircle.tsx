"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";

import assets from "@/variables/images";

type CheckboxCircleProps = {
  state?: boolean;
  onStateChange?: (state: boolean) => void;
  className?: string;
  disabled?: boolean;
};

export default function CheckboxCircle({
  state = false,
  onStateChange,
  className,
  disabled = false,
}: CheckboxCircleProps) {
  const [checkState, setCheckState] = useState(state);

  const checkboxCircleClass = clsx("relative w-6 h-6 pc:w-9 pc:h-9", className);

  const handleCheckboxCircleClick = () => {
    if (!disabled) {
      setCheckState((prev) => {
        const newState = !prev;
        onStateChange?.(newState);
        return newState;
      });
    }
  };

  useEffect(() => {
    setCheckState(state);
  }, [state]);

  return (
    <div
      onClick={handleCheckboxCircleClick}
      role="checkbox"
      aria-checked={checkState}
      className={checkboxCircleClass}
    >
      <Image
        src={checkState ? assets.icons.radioActive : assets.icons.radioInactive}
        alt="체크 박스"
        fill
      />
    </div>
  );
}
