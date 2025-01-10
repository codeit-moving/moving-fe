import { useEffect, useRef } from "react";

interface UseInfiniteScrollProps {
  callback: () => void;
  options?: IntersectionObserverInit;
}

export default function useInfiniteScroll({
  callback,
  options,
}: UseInfiniteScrollProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!callback) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) callback();
    }, options);

    if (targetRef.current) observer.observe(targetRef.current);

    return () => {
      if (targetRef.current) observer.disconnect();
    };
  }, [callback, options]);

  return targetRef;
}
