"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserInfo } from "@/api/user";
import { useUserStore } from "@/store/userStore";
import { toast } from "react-hot-toast";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: "USER" | "MOVER" | null;
  fallbackPath?: string;
}

const publicPaths = [
  "/auth/login",
  "/auth/register",
  "/mover/auth/login",
  "/mover/auth/register",
  "/me/profile",
  "/find-mover",
  "/mover/profile",
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
  const [isLoading, setIsLoading] = useState<null | boolean>(null); // null로 초기화

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        if (pathname === "/find-mover") {
          if (useUserStore.getState().userRole === "MOVER") {
            setIsAuthorized(false);
            setIsLoading(false);
            router.push("/mover/request");
            return;
          } else {
            setIsAuthorized(true);
            setIsLoading(false);
            return;
          }
        }

        if (publicPaths.some((path) => pathname.startsWith(path))) {
          setIsAuthorized(true);
          setIsLoading(false);
          return;
        }

        if (commonPaths.includes(pathname)) {
          if (!useUserStore.getState().userRole) {
            setIsAuthorized(true);
            setIsLoading(false);
            return;
          }
        }

        const userInfo = await getUserInfo();
        const userRole = userInfo.user.mover
          ? "MOVER"
          : userInfo.user.customer
          ? "USER"
          : null;

        const setUserData = useUserStore.getState().setUserData;
        setUserData({
          email: userInfo.user.email,
          name: userInfo.user.name,
          phoneNumber: userInfo.user.phoneNumber,
          role: userRole,
          isOAuth: userInfo.user.isOAuth,
        });

        const hasPermission = userRole && allowedRoles?.includes(userRole);
        if (!hasPermission) {
          toast.error("접근 권한이 없습니다.");
          router.replace(fallbackPath);
          return;
        }

        setIsAuthorized(true);
      } catch (error) {
        router.replace(fallbackPath);
      } finally {
        setIsLoading(false);
      }
    };

    checkUserRole();
  }, [allowedRoles, fallbackPath, pathname, router]);

  if (isLoading === null) {
    return null; // loading.tsx 활용
  }

  if (!isAuthorized) {
    return null; // 권한 없으면 아무것도 렌더링하지 않음
  }

  return <>{children}</>;
}
