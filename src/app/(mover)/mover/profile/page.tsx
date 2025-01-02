"use client";

import Profile from "@/components/forms/Profile";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const styles = {
  container: `flex flex-col items-center w-full`,
};

export default function ProfilePage() {
  const [isOAuth, setIsOAuth] = useState(false);
  const searchParams = useSearchParams();

  useEffect(() => {
    // URL에서 oauth=true 파라미터를 확인
    const oauthParam = searchParams.get("oauth");
    if (oauthParam === "true") {
      setIsOAuth(true);
    }
  }, [searchParams]);

  return (
    <div className={styles.container}>
      <Profile isUser={true} isEdit={false} isOAuth={isOAuth} />
    </div>
  );
}
