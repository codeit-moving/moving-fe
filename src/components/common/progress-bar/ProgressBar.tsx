import clsx from "clsx";

interface ProgressBarProps {
  maxValue: number;
  currentValue: number;
  frameClass: string;
  barClass: string;
}

export default function ProgressBar({
  maxValue,
  currentValue,
  frameClass,
  barClass,
}: ProgressBarProps) {
  const progressBarframeClass = clsx(
    "box-border flex flex-row justify-start",
    "rounded-full bg-bg-300",
    "overflow-hidden",
    frameClass
  );

  const progressBarClass = clsx(
    "h-full",
    "rounded-full bg-pr-blue-300",
    "z-10",
    "transition-all duration-700 ease-out",
    barClass
  );

  const progressPercentage = Math.min((currentValue / maxValue) * 100, 100);

  return (
    <div className={progressBarframeClass}>
      <div
        className={progressBarClass}
        style={{
          width: `${progressPercentage}%`,
          transform: "scaleX(1)",
          transformOrigin: "left",
        }}
      />
    </div>
  );
}
