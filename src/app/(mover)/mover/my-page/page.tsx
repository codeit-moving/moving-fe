import LineSeparator from "@/components/common/LineSeparator";
import MoversReviewList from "@/components/review/MoversReviewList";
import Message from "@/components/common/Message";
import { ProfileActions } from "./ProfileActions";
import { getMoverProfile } from "@/api/mover";
import { cookies } from "next/headers";

export default async function MyPage() {
  const cookieStore = await cookies();
  const cookie = `accessToken=${cookieStore.get("accessToken")?.value}`;

  const data = await getMoverProfile(cookie);

  if (!data) {
    return <Message msg="내 페이지 정보가 없습니다." />;
  }

  return (
    <div className="pc:max-w-[1400px] pc:flex pc:flex-col pc:justify-center pc:mx-auto">
      <section>
        <h2
          className={"text-lg font-bold text-black-400 pc:text-2xl mb-[15px]"}
        >
          마이페이지
        </h2>
        <LineSeparator
          direction="horizontal"
          className="mb-[24px] pc:bg-transparent"
        />
        <ProfileActions data={data} />
      </section>
      <LineSeparator
        direction="horizontal"
        className="my-[24px] pc:my-[48px]"
      />
      <MoversReviewList totalRating={data.rating} moverId={data.id} />
    </div>
  );
}
