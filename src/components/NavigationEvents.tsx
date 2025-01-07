"use client";

import { useEffect, useRef, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { useNavigationStore } from "@/store/useNavigationStore";

export function NavigationEvents() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startNavigation, endNavigation } = useNavigationStore();

  const lastPath = useRef<string | null>(null);
  const lastSearchParams = useRef<string | null>(null);

  const memoizedStartNavigation = useCallback(() => {
    startNavigation();
  }, [startNavigation]);

  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor?.href) {
        const url = new URL(anchor.href);

        if (url.origin === window.location.origin) {
          const isSamePage =
            url.pathname === pathname && url.search === searchParams.toString();

          if (!isSamePage) {
            memoizedStartNavigation();
          }
        }
      }
    };

    window.addEventListener("click", handleAnchorClick);
    window.addEventListener("popstate", memoizedStartNavigation);

    return () => {
      window.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("popstate", memoizedStartNavigation);
    };
  }, [pathname, searchParams, memoizedStartNavigation]);

  useEffect(() => {
    const pathChanged = pathname !== lastPath.current;
    const searchParamsChanged =
      searchParams.toString() !== lastSearchParams.current;

    if (!pathChanged && !searchParamsChanged) {
      return;
    }

    lastPath.current = pathname;
    lastSearchParams.current = searchParams.toString();

    memoizedStartNavigation();

    let mounted = true;
    const timeoutId = setTimeout(() => {
      if (mounted) {
        endNavigation();
      }
    }, 500);

    return () => {
      mounted = false;
      clearTimeout(timeoutId);
    };
  }, [pathname, searchParams, memoizedStartNavigation, endNavigation]);

  return null;
}
