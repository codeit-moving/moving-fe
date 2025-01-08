"use client";

import React, { Suspense } from "react";
import LoginComponent from "@/components/auth/LoginComponent";
import { useEffect } from "react";
import { useToastStore } from "@/store/useToastStore";
import { useSearchParams } from "next/navigation";

function LoginPageContent() {
  const searchParams = useSearchParams();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const toastType = searchParams.get("toastType");
    const toastMessage = searchParams.get("toastMessage");

    if (toastType && toastMessage) {
      showToast(toastMessage, toastType as any);
    }
  }, [searchParams, showToast]);

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

export default function SearchParamsContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginPageContent />
    </Suspense>
  );
}
