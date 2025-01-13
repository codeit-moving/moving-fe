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
        const userProfileImage = userInfo.data.user.mover
          ? userInfo.data.user.mover.imageUrl
          : userInfo.data.user.customer
          ? userInfo.data.user.customer.imageUrl
          : null;

        setUserData({
          email: userInfo.data.user.email,
          name: userInfo.data.user.name,
          phoneNumber: userInfo.data.user.phoneNumber,
          role: userRole,
          isOAuth: userInfo.data.user.isOAuth,
          profileImage: userProfileImage,
        });
      } catch (error: any) {
        if (
          error?.response?.status !== 401 &&
          error?.response?.status !== 403
        ) {
        }
      }
    };

    checkAndRefreshToken();

    const interval = setInterval(checkAndRefreshToken, 1000 * 60 * 14);
    return () => clearInterval(interval);
  }, [setUserData]);
};
