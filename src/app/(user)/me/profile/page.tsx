"use client";

import Profile from "@/components/forms/Profile";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const styles = {
  container: `flex flex-col items-center w-full`,
};

function ProfileContent() {
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

export default function ProfilePage() {
  return (
    <div className={styles.container}>
      <Suspense fallback={<div>로딩중...</div>}>
        <ProfileContent />
      </Suspense>
    </div>
  );
}
