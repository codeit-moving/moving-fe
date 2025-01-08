import { cookies } from "next/headers";

import Profile from "@/components/forms/Profile";
import Message from "@/components/common/Message";
import { getUserInfo } from "@/api/user";

export default async function ProfileEditPage() {
  const cookieStore = await cookies();
  const cookie = `accessToken=${cookieStore.get("accessToken")?.value}`;

  try {
    const userData = await getUserInfo(cookie);
    return (
      <div className="flex flex-col items-center w-full">
        <Profile
          isUser={false}
          isEdit={true}
          userData={userData}
          isOAuth={false}
        />
      </div>
    );
  } catch (err) {
    console.error(err);
    return <Message msg="유저 정보 조회 오류가 발생했습니다." />;
  }
}
