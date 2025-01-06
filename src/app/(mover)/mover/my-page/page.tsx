"use client";

import MoverProfileCard from "@/components/cards/MoverProfileCard";
import LineSeparator from "@/components/common/LineSeparator";
import { useRouter } from "next/navigation";
import MoversReviewList from "@/components/review/MoversReviewList";
import { useGetMoverMyPage } from "@/api/query-hooks/mover";
import Loader from "@/components/common/Loader";
import Message from "@/components/common/Message";

export default function MyPage() {
  const router = useRouter();
  const { data, isPending } = useGetMoverMyPage();

  if (isPending) {
    return <Loader msg="내 페이지 불러오는 중" />;
  }

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

        <MoverProfileCard
          data={data}
          onPrimaryClick={() => router.push("/mover/profile-edit")}
          onOutlinedClick={() => router.push("/mover/info-edit")}
        />
      </section>
      <LineSeparator
        direction="horizontal"
        className="my-[24px] pc:my-[48px]"
      />
      <MoversReviewList totalRating={data.rating} moverId={data.id} />
    </div>
  );
}
