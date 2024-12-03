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
  const [checkState, setCheckState] = useState(state);

  const checkboxClass = clsx("relative w-9 h-9", className);

  const handleCheckboxClick = () => {
    if (!disabled) {
      setCheckState((prev) => !prev);
    }
  };

  useEffect(() => {
    if (onStateChange) {
      onStateChange(checkState);
    }
  }, [checkState, onStateChange]);

  return (
    <div
      onClick={handleCheckboxClick}
      role="checkbox"
      aria-checked={checkState}
      className={checkboxClass}
    >
      <Image
        src={
          checkState
            ? assets.icons.checkboxActive
            : assets.icons.checkboxInactive
        }
        alt="체크 박스"
        fill
      />
    </div>
  );
}
