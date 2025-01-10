"use client";

import Profile from "@/components/forms/Profile";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

export default function ProfileContent() {
  const [isOAuth, setIsOAuth] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    const oauthParam = searchParams.get("oauth");
    if (oauthParam === "true") {
      setIsOAuth(true);
    }
  }, [searchParams]);

  return <Profile isUser={true} isEdit={false} isOAuth={isOAuth} />;
}
