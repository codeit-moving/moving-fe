"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserInfo } from "@/api/user";
import { useUserStore } from "@/store/userStore";
import Loader from "../common/Loader";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: "USER" | "MOVER" | null;
  fallbackPath?: string;
}

// 검사가 필요없는 public 경로들
const publicPaths = [
  "/auth/login",
  "/auth/register",
  "/mover/auth/login",
  "/mover/auth/register",
  "/me/profile",
  "/mover/profile",
  "/find-mover",
  "/oauth/kakao",
  "/oauth/google",
  "/oauth/naver",
];

const commonPaths = ["/find-mover"];

export default function RoleGuard({
  children,
  allowedRoles,
  fallbackPath = "/",
}: RoleGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkUserRole = async () => {
      // public 경로인 경우 바로 접근 허용
      if (publicPaths.some((path) => pathname.startsWith(path))) {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      if (commonPaths.includes(pathname) && !useUserStore.getState().userRole) {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      try {
        const userInfo = await getUserInfo();
        const userRole = userInfo.user.mover
          ? "MOVER"
          : userInfo.user.customer
          ? "USER"
          : null;

        useUserStore.getState().setUserData({
          email: userInfo.user.email,
          name: userInfo.user.name,
          phoneNumber: userInfo.user.phoneNumber,
          role: userRole,
        });
        console.log("RoleGuard userType : ", useUserStore.getState().userRole);
        const hasPermission = userRole && allowedRoles?.includes(userRole);
        if (!hasPermission) {
          router.replace(fallbackPath);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        console.error("Role check error:", error);
        router.replace(fallbackPath);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [allowedRoles, fallbackPath, router, pathname]);

  if (isLoading) {
    return <Loader msg="페이지 로딩중" />;
  }

  return isAuthorized ? children : null;
}
