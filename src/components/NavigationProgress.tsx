"use client";

import { useEffect, useState } from "react";
import { useNavigationStore } from "@/store/useNavigationStore";

export function NavigationProgress() {
  const isClientNavigating = useNavigationStore(
    (state) => state.isClientNavigating
  );
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isClientNavigating) {
      let timer: NodeJS.Timeout;
      setProgress(10);

      timer = setInterval(() => {
        setProgress((prevProgress) => {
          if (prevProgress >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prevProgress + 5;
        });
      }, 100);

      return () => clearInterval(timer);
    } else {
      setProgress(0);
    }
  }, [isClientNavigating]);

  if (!isClientNavigating) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-100 z-50">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{
          width: `${progress}%`,
          animation: "progressAnimation 2s ease-in-out infinite",
        }}
      />
    </div>
  );
}
