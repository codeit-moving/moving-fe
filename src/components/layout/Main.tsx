"use client";

import React from "react";
import { usePathname } from "next/navigation";
import cn from "@/config/cn";
interface MainProps {
  children: React.ReactNode;
  grayBgPaths: string[];
}

const Main = ({ grayBgPaths, children }: MainProps) => {
  const pathname = usePathname();
  const isGreyBg = grayBgPaths.includes(pathname);

  const styles = {
    padding: "px-[24px] tablet:px-[72px] py-[14px] pc:py-[32px]",
  };

  return (
    <>
      <main className={cn(styles.padding, isGreyBg && "bg-bg-100 h-[100vh]")}>
        {children}
      </main>
    </>
  );
};

export default Main;
