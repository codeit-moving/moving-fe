// app/test-loading/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function TestLoadingPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);
  }, []);

  if (isLoading) {
    throw new Promise((resolve) => setTimeout(resolve, 5000));
  }

  return <div>This content will show after 5 seconds</div>;
}
