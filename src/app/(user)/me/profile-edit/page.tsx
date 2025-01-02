"use client";

import Profile from "@/components/forms/Profile";
import { getUserInfo } from "@/api/user";
import { useEffect, useState } from "react";

export default function ProfileEditPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserInfo().then(setUserData);
  }, []);

  if (!userData) return null;

  return (
    <div className="flex flex-col items-center w-full">
      <Profile
        isUser={true}
        isEdit={true}
        userData={userData}
        isOAuth={false}
      />
    </div>
  );
}
