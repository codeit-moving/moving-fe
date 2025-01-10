import clsx from "clsx";

import ProgressBar from "./ProgressBar";

interface ProgressBarMovingRequestProps {
  maxValue: number;
  currentValue: number;
}

export default function ProgressBarMovingRequest({
  maxValue,
  currentValue,
}: ProgressBarMovingRequestProps) {
  const ProgressBarMovingRequestFrameClass = clsx(
    "h-2 bg-line-200",
    "pc:w-full"
  );
  const ProgressBarMovingRequestClass = clsx("!bg-pr-blue-300");

  return (
    <ProgressBar
      maxValue={maxValue}
      currentValue={currentValue}
      frameClass={ProgressBarMovingRequestFrameClass}
      barClass={ProgressBarMovingRequestClass}
    />
  );
}
