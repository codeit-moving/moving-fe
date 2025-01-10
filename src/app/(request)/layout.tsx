"use client";

import React from "react";
import Main from "@/components/layout/Main";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/hooks/useAuth";
import { QuoteProgressProvider } from "@/contexts/QuoteProgressContext";
import ProgressBarMovingRequest from "@/components/common/progress-bar/ProgressBarMovingRequest";

interface LayoutProps {
  children: React.ReactNode;
}

const QuoteRequestLayout = ({ children }: LayoutProps) => {
  useAuth(); // 사용자 인증 상태 확인

  return (
    <RoleGuard allowedRoles={"USER"}>
      <QuoteProgressProvider>
        {/* ProgressBar 영역 */}
        <div className="sticky top-0 z-5 bg-white">
          <div className="flex flex-col max-w-[1400px] font-semibold px-5 py-8 mx-auto gap-6">
            견적 요청
            <ProgressBarMovingRequest maxValue={3} currentValue={1} />
          </div>
        </div>

        {/* 전체 배경색이 적용되는 영역 */}
        <div className="bg-bg-200 min-h-screen w-full">
          <div className="max-w-[1400px] px-5 mx-auto pt-4">{children}</div>
        </div>
      </QuoteProgressProvider>
    </RoleGuard>
  );
};

export default QuoteRequestLayout;
