"use client";

import CreateReviewCard from "@/components/cards/CreateReviewCard";
import MyReviewCard, {
  MyReviewCardData,
} from "@/components/cards/MyReviewCard";
import Pagination from "@/components/common/Pagination";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import EmptyReview from "./EmptyReview";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import ReviewModal from "@/components/modals/ReviewModal";
import { type ReviewMoverData } from "@/components/common/card/ReviewMover";
import {
  useGetMyReviewList,
  useGetAvailableReviewList,
} from "@/api/query-hooks/review";
import Loader from "@/components/common/Loader";

interface ReviewModal_Props {
  data: ReviewMoverData;
}

const ReviewNiceModal_ = NiceModal.create(({ data }: ReviewModal_Props) => {
  const modal = useModal();

  return (
    <div className="bg-[#141414] bg-opacity-50 fixed inset-0 flex flex-col items-center justify-end tablet:justify-center pc:justify-center">
      <div className="flex flex-col items-center justify-center mx-auto bg-transparent w-full">
        <ReviewModal onClose={() => modal.remove()} data={data} />
      </div>
    </div>
  );
});

NiceModal.register("ReviewNiceModal", ReviewNiceModal_);

const emptyReviewList = {
  currentPage: 1,
  pageSize: 6,
  totalPages: 5,
  totalCounts: 26,
  list: [],
};

export default function MyReviewPage() {
  const [pageNum, setPageNum] = useState(1);
  const searchParams = useSearchParams();
  const currentTab = Number(searchParams.get("tab") || "0");

  const { data: myReviewList, isPending } = useGetMyReviewList({ pageNum });
  const { data: reviewToWriteList, isPending: isAvailableDataPending } =
    useGetAvailableReviewList({ pageNum });

  const handleWriteReview = (data: ReviewMoverData) => {
    NiceModal.show("ReviewNiceModal", {
      data: data,
    });
  };

  if (isPending || isAvailableDataPending) {
    return <Loader msg="리뷰 목록을 불러오고 있어요." />;
  }

  const displayData =
    currentTab === 0
      ? reviewToWriteList ?? emptyReviewList
      : myReviewList ?? emptyReviewList;

  if (displayData.list.length === 0) {
    return <EmptyReview tab={currentTab} />;
  }

  return (
    <>
      <ul className="max-w-[1400px] mx-auto my-[16px] pc:my-[24px] bg-bg-100 grid grid-cols-1 gap-[24px] tablet:gap-[32px] pc:grid-cols-2 pc:gap-x-[24px] pc:gap-y-[48px]">
        {displayData.list.map((item) => {
          return currentTab === 0 ? (
            <CreateReviewCard
              data={item as ReviewMoverData}
              key={`createReview-${item.nickname}`}
              onPrimaryClick={() => handleWriteReview(item as ReviewMoverData)}
            />
          ) : (
            <MyReviewCard
              data={item as MyReviewCardData}
              key={`reviewed-${item.nickname}`}
            />
          );
        })}
      </ul>
      <Pagination
        currentPage={pageNum}
        totalPages={displayData.totalPages}
        onPageChange={setPageNum}
      />
    </>
  );
}
