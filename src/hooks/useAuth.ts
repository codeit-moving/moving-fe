"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";
import { axiosInstance } from "@/api/axios";

export const useAuth = () => {
  const { setUserData } = useUserStore();

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      try {
        await axiosInstance.post("/auth/refresh");

        const userInfo = await axiosInstance.get("/users");
        const userRole = userInfo.data.user.mover
          ? "MOVER"
          : userInfo.data.user.customer
          ? "USER"
          : null;

        setUserData({
          email: userInfo.data.user.email,
          name: userInfo.data.user.name,
          phoneNumber: userInfo.data.user.phoneNumber,
          role: userRole,
        });
      } catch (error: any) {
        if (
          error?.response?.status !== 401 &&
          error?.response?.status !== 403
        ) {
          console.log("[useAuth] 예상치 못한 에러:", error);
        }
      }
    };

    checkAndRefreshToken();

    const interval = setInterval(checkAndRefreshToken, 1000 * 60 * 14);
    return () => clearInterval(interval);
  }, [setUserData]);
};
