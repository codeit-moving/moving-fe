"use client";

import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { useToastStore } from "@/store/useToastStore";

export default function Toast() {
  const { message, type, clearToast } = useToastStore();

  useEffect(() => {
    if (message && type) {
      switch (type) {
        case "success":
          toast.success(message, {
            duration: 3000,
            position: "top-right",
          });
          break;
        case "error":
          toast.error(message, {
            duration: 3000,
            position: "top-right",
          });
          break;
        case "warning":
          toast(message, {
            icon: "⚠️",
            duration: 3000,
            position: "top-right",
          });
          break;
        case "info":
          toast(message, {
            icon: "ℹ️",
            duration: 3000,
            position: "top-right",
          });
          break;
      }

      clearToast();
    }
  }, [message, type, clearToast]);

  return null;
}
