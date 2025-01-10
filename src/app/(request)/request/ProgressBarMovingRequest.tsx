import { useQuoteProgress } from "@/contexts/QuoteProgressContext";
import ProgressBar from "@/components/common/progress-bar/ProgressBar";

export default function ProgressBarMovingRequest({
  maxValue,
}: {
  maxValue: number;
}) {
  const { step } = useQuoteProgress();

  return (
    <ProgressBar
      maxValue={maxValue}
      currentValue={step}
      frameClass="w-full bg-gray-200"
      barClass="bg-blue-600"
    />
  );
}
