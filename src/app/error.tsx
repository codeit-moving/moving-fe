"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    Sentry.captureException(error);
    if (retryCount < 2) {
      const timer = setTimeout(() => {
        setRetryCount((prev) => prev + 1);
        reset();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, reset, retryCount]);

  return (
    <div className="py-4 flex flex-col items-center justify-center gap-2">
      <button
        onClick={reset}
        className="px-2 py-1 text-sm text-white rounded-lg"
      >
        <div className="text-gray-500 hover:text-gray-300 transition-colors duration-200 gap-1">
          <div className="text-lg font-medium">
            {retryCount >= 2
              ? "문제가 계속되고 있어요"
              : "일시적인 문제가 발생했어요!"}
          </div>
          <div className="text-sm">
            {retryCount >= 2
              ? "다시 시도하기"
              : `다시 해보고 있어요.. (${retryCount + 1}/2)`}
          </div>
        </div>
      </button>
    </div>
  );
}
