"use client";

import InfoEdit from "@/components/forms/InfoEdit";
import { getUserInfo } from "@/api/user";
import { useEffect, useState } from "react";

export default function InfoEditPage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    getUserInfo().then(setUserData);
  }, []);

  if (!userData) return null;

  return (
    <div className="flex flex-col items-center w-full">
      <InfoEdit isUser={true} userData={userData} />
    </div>
  );
}
