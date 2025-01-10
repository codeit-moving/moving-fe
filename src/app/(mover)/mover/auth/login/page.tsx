"use client";

import React from "react";
import LoginComponent from "@/components/auth/LoginComponent";
import { useEffect } from "react";
import { useToastStore } from "@/store/useToastStore";
import { useSearchParams } from "next/navigation";

export default function MoverLoginPage() {
  const searchParams = useSearchParams();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    // from=protected로 온 경우
    const from = searchParams.get("from");
    if (from === "protected") {
      showToast("해당 서비스 이용을 위해 로그인이 필요합니다.", "error");
      return;
    }

    // 일반적인 토스트 메시지가 있는 경우
    const toastType = searchParams.get("toastType");
    const toastMessage = searchParams.get("toastMessage");

    if (toastType && toastMessage) {
      showToast(toastMessage, toastType as any);
    }
  }, [searchParams, showToast]);

  const styles = {
    container: `flex items-center w-full mt-[57px]
    tablet:w-[327px] mx-auto px-0
    pc:w-[640px] pc:mt-[26px]`,
  };
  return (
    <div className={styles.container}>
      <LoginComponent isUser={false} />
    </div>
  );
}
