"use client";

import { useEffect, useState } from "react";

export function MSWComponent({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(
    process.env.NEXT_PUBLIC_API_MOCKING !== "enabled" // 모킹이 활성화되지 않은 경우 초기 상태를 준비 완료로 설정
  );

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
      import("@/mocks/browser").then(
        ({ startWorker }) => startWorker().then(() => setIsReady(true)) // MSW 초기화 후 상태 업데이트
      );
    }
  }, []);

  if (!isReady) {
    // 초기화 전 로딩 상태 표시
    return (
      <div className="w-full h-full mt-5 items-center justify-center flex">
        <div className="text-2xl font-bold text-gray-800">
          MOCKING SERVER INITIALIZING
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

export default MSWComponent;
