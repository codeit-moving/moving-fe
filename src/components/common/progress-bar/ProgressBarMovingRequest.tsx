import clsx from "clsx";

import { useQuoteProgress } from "@/contexts/QuoteProgressContext";
import ProgressBar from "./ProgressBar";

interface ProgressBarMovingRequestProps {
  maxValue: number;
}

export default function ProgressBarMovingRequest({
  maxValue,
}: ProgressBarMovingRequestProps) {
  const { step } = useQuoteProgress();

  return (
    <ProgressBar
      maxValue={maxValue}
      currentValue={step}
      frameClass="w-full h-2 bg-gray-200"
      barClass="bg-blue-600"
    />
  );
}
