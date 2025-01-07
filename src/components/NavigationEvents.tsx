"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useNavigationStore } from "@/store/useNavigationStore";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startNavigation, endNavigation } = useNavigationStore();

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor?.href && anchor.href.startsWith(window.location.origin)) {
        startNavigation();
      }
    };

    window.addEventListener("click", handleAnchorClick);
    window.addEventListener("popstate", startNavigation);

    return () => {
      window.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("popstate", startNavigation);
    };
  }, [startNavigation]);

  // 경로 변경 감지 및 처리
  useEffect(() => {
    let mounted = true;

    startNavigation();

    const timeoutId = setTimeout(() => {
      if (mounted) {
        endNavigation();
      }
    }, 500);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams, startNavigation, endNavigation]);

  return null;
}
