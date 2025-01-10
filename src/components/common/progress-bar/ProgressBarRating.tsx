import clsx from "clsx";

import ProgressBar from "./ProgressBar";

interface ProgressBarRatingProps {
  maxValue: number;
  currentValue: number;
}

export default function ProgressBarRating({
  maxValue,
  currentValue,
}: ProgressBarRatingProps) {
  const ProgressBarRatingFrameClass = clsx("w-[180px] h-2", "pc:w-[370px]");
  const ProgressBarRatingClass = clsx("");

  return (
    <ProgressBar
      maxValue={maxValue}
      currentValue={currentValue}
      frameClass={ProgressBarRatingFrameClass}
      barClass={ProgressBarRatingClass}
    />
  );
}
