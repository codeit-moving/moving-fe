"use client";

import { useNavigationStore } from "@/store/useNavigationStore";
import { Loader2 } from "lucide-react";

export function LoadingOverlay() {
  const isNavigating = useNavigationStore((state) => state.isNavigating);

  if (!isNavigating) return null;

  return (
    <div className="fixed inset-0 bg-black/10 flex items-center justify-center z-50 transition-opacity duration-200">
      <div className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
        <span className="text-gray-600">페이지 이동중...</span>
      </div>
    </div>
  );
}
