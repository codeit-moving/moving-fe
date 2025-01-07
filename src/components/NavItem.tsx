"use client";

import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import { useNavigationStore } from "@/store/useNavigationStore";
import cn from "@/config/cn";

interface NavItemProps {
  href: string;
  isIncludedPath?: boolean;
  children: React.ReactNode;
}

export function NavItem({
  href,
  isIncludedPath = false,
  children,
}: NavItemProps) {
  const router = useRouter();
  const pathname = usePathname();
  const startNavigation = useNavigationStore((state) => state.startNavigation);

  const isActive = isIncludedPath
    ? pathname === href
    : pathname.startsWith(href);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    startNavigation();
    router.push(href);
  };

  let linkStyle = cn(
    "text-lg font-bold",
    isActive ? "text-black-400" : "text-gray-400"
  );

  return (
    <a href={href} className={linkStyle} onClick={handleClick}>
      {children}
    </a>
  );
}
