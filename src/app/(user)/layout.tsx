import Main from "@/components/layout/Main";
import React from "react";
import RoleGuard from "@/components/auth/RoleGuard";
interface LayoutProps {
  children: React.ReactNode;
}

const GREY_BG_PATHS = ["/me/mover", "/me/review"];

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <RoleGuard allowedRoles={["customer"]}>
        <Main grayBgPaths={GREY_BG_PATHS}>{children}</Main>
      </RoleGuard>
    </>
  );
};

export default Layout;
