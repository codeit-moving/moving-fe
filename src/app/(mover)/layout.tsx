import Main from "@/components/layout/Main";
import React from "react";
import RoleGuard from "@/components/auth/RoleGuard";
interface LayoutProps {
  children: React.ReactNode;
}

const GREY_BG_PATHS = ["/mover/my-quote"];

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <RoleGuard allowedRoles={["mover"]}>
        <Main grayBgPaths={GREY_BG_PATHS}>{children}</Main>
      </RoleGuard>
    </>
  );
};

export default Layout;
