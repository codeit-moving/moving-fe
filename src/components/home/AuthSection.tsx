"use client";

import { useAuth } from "@/hooks/useAuth";
import AuthButtons from "@/components/home/AuthButtons";
import { useToastStore } from "@/store/useToastStore";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
export default function AuthSection() {
  useAuth();
  const searchParams = useSearchParams();
  const showToast = useToastStore((state) => state.showToast);

  useEffect(() => {
    const toastType = searchParams.get("toastType");
    const toastMessage = searchParams.get("toastMessage");

    if (toastType && toastMessage) {
      showToast(toastMessage, toastType as any);
    }
  }, [searchParams, showToast]);

  return <AuthButtons />;
}
