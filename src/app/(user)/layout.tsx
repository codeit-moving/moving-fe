"use client";

import Main from "@/components/layout/Main";
import React from "react";
import RoleGuard from "@/components/auth/RoleGuard";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

const GREY_BG_PATHS = ["/me/mover", "/me/review"];

const Layout = ({ children }: LayoutProps) => {
  useAuth();
  return (
    <>
      <RoleGuard allowedRoles={"USER"}>
        <Main grayBgPaths={GREY_BG_PATHS}>{children}</Main>
      </RoleGuard>
    </>
  );
};

export default Layout;
