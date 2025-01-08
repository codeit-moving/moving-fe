"use client";

import { useGetManagedQuoteList } from "@/api/query-hooks/quote";
import SentQuoteCard from "@/components/cards/SentQuoteCard";
import { useRouter, useSearchParams } from "next/navigation";
import RejectedRequestCard from "@/components/cards/RejectedRequestCard";
import Loader from "@/components/common/Loader";
import Message from "@/components/common/Message";
import { type QuoteDetailsData, type SentQuoteData } from "@/types/quote";
import { CursorResponse } from "@/types/api";
import { useEffect, Suspense } from "react";
import { useInView } from "react-intersection-observer";

interface QuoteCardListProps {
  pages: CursorResponse<SentQuoteData | QuoteDetailsData>[];
  currentTab: number;
}

const QuoteCardList = ({ pages, currentTab }: QuoteCardListProps) => {
  const router = useRouter();
  return (
    <ul className="max-w-[1400px] mx-auto bg-bg-100 grid grid-cols-1 gap-[24px] mt-[24px] pc:grid-cols-2 tablet:gap-[32px] tablet:mt-[32px] pc:gap-x-[24px] pc:gap-y-[48px] pc:mt-[40px]">
      {pages.map((page) =>
        page.list.map((item) =>
          currentTab === 0 ? (
            <SentQuoteCard
              key={item.id}
              data={item as SentQuoteData}
              onButtonClick={() => router.push(`/mover/my-quote/${item.id}`)}
              classNameQuoteDetails="pc:flex-col pc:gap-2 pc:items-start"
            />
          ) : (
            <RejectedRequestCard
              key={item.id}
              data={item}
              classNameQuoteDetails="pc:flex-col pc:gap-2 pc:items-start"
            />
          )
        )
      )}
    </ul>
  );
};

const QuoteListContainer = ({ currentTab }: { currentTab: number }) => {
  const { ref, inView } = useInView();

  const {
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isPending,
    isError,
    data,
  } = useGetManagedQuoteList({ tab: currentTab });

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isFetching, inView, hasNextPage, fetchNextPage]);

  if (isPending) {
    return <Loader msg="견적을 불러오는 중입니다." />;
  }

  if (isError) {
    return <Message msg="견적을 불러오는중 오류가 발생했습니다." />;
  }

  const pages = data?.pages || [];
  const isEmpty = pages[0]?.list.length === 0 || pages.length === 0;

  if (isEmpty) {
    return <Message msg="데이터 없음" />;
  }

  return (
    <>
      <QuoteCardList pages={pages} currentTab={currentTab} />

      <div ref={ref} className="mt-6">
        {isFetchingNextPage ? (
          <Loader msg="견적 목록 불러오는중" />
        ) : hasNextPage ? (
          <Loader msg="새 목록 불러오는 중" />
        ) : (
          <Message msg="더 불러올 목록이 없습니다." />
        )}
      </div>
    </>
  );
};

const QuoteList = () => {
  const searchParams = useSearchParams();
  const currentTab = Number(searchParams.get("tab") || "0");

  return <QuoteListContainer currentTab={currentTab} />;
};

export default function MyQuotePage() {
  return (
    <Suspense fallback={<Loader msg="로딩중..." />}>
      <QuoteList />
    </Suspense>
  );
}
