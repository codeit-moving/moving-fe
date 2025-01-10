import clsx from "clsx";

import ProgressBarMovingRequest from "./common/progress-bar/ProgressBarMovingRequest";

interface MovingRequestProgressInfoProps {
  maxValue: number;
  currentValue: number;
}

export default function MovingRequestProgressInfo({
  maxValue,
  currentValue,
}: MovingRequestProgressInfoProps) {
  const MovingRequestProgressInfoClass = clsx(
    "flex flex-col justify-center items-center gap-4",
    "w-full h-[96px]",
    "pc:gap-6 pc:h-[128px]"
  );
  const ProgressInfoTextClass = clsx(
    "w-[327px]",
    "text-2lg font-semibold text-black-400",
    "pc:w-[1400px] pc:text-2xl"
  );

  return (
    <div className={MovingRequestProgressInfoClass}>
      <div className={ProgressInfoTextClass}>견적요청</div>
      <ProgressBarMovingRequest
        maxValue={maxValue}
        currentValue={currentValue}
      />
    </div>
  );
}
