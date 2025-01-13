"use client";

import React, { Suspense } from "react";
import LoginComponent from "@/components/auth/LoginComponent";
import { useEffect } from "react";
import { useToastStore } from "@/store/useToastStore";
import { useSearchParams, useRouter } from "next/navigation";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    // 즉시 실행 함수로 감싸서 async/await 사용
    (async () => {
      const toastType = searchParams.get("toastType");
      const toastMessage = searchParams.get("toastMessage");

      if (toastType && toastMessage) {
        // 토스트 표시
        await showToast(toastMessage, toastType as any);

        // URL에서 토스트 파라미터 제거
        const newUrl = new URL(window.location.href);
        newUrl.searchParams.delete("toastType");
        newUrl.searchParams.delete("toastMessage");
        router.replace(newUrl.pathname + newUrl.search);
      }
    })();
  }, [searchParams, showToast, router]);

  const styles = {
    container: `flex items-center w-full mt-[57px]
    tablet:w-[327px] tablet:mx-auto tablet:px-0
    pc:w-[640px] pc:mt-[26px]`,
  };

  return (
    <div className={styles.container}>
      <LoginComponent isUser={true} />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900" />
    </div>
  );
}

export default function SearchParamsContent() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LoginPageContent />
    </Suspense>
  );
}
