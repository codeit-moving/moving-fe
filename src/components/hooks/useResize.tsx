import { useEffect } from "react";

export default function useResize(callback: (width: number) => void) {
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      callback(width);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [callback]);
}
