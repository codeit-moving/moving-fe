"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getUserInfo } from "@/api/user";

interface RoleGuardProps {
  children: React.ReactNode;
  allowedRoles: ("customer" | "mover")[];
  fallbackPath?: string;
}

// 역할 검사가 필요없는 public 경로들
const publicPaths = [
  "/auth/login",
  "/auth/register",
  "/mover/auth/login",
  "/mover/auth/register",
  "/me/profile",
  "/mover/profile",
];

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
      if (publicPaths.includes(pathname)) {
        setIsAuthorized(true);
        setIsLoading(false);
        return;
      }

      try {
        const userInfo = await getUserInfo();
        const userRole = userInfo.user.mover ? "mover" : "customer";

        const hasPermission = allowedRoles.includes(userRole);
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
    return (
      <div className="flex flex-col w-full mt-3 gap-[32px] overflow-hidden tablet:mt-4 pc:mt-[32px] pc:gap-[48px]">
        <p>Loading...</p>
      </div>
    );
  }

  return isAuthorized ? children : null;
}
