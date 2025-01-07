"use client";

import { useNavigationStore } from "@/store/useNavigationStore";

export function NavigationProgress() {
  const isClientNavigating = useNavigationStore(
    (state) => state.isClientNavigating
  );

  if (!isClientNavigating) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-blue-100 z-50">
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{
          width: "90%",
          animation: "progressAnimation 2s ease-in-out infinite",
        }}
      />
    </div>
  );
}
