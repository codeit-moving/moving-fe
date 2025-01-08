"use client";

import FavoriteMoverCard, {
  type FavoriteMoverData,
} from "@/components/cards/FavoriteMoverCard";
import cn from "@/config/cn";
import Loader from "@/components/common/Loader";
import Message from "@/components/common/Message";
import { useGetFavoriteMoverList } from "@/api/query-hooks/mover";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import EmptyList from "@/components/EmptyList";

export default function FavoriteMoverPage() {
  const { ref, inView } = useInView();
  const {
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    hasNextPage,
    isPending,
    isError,
    data,
  } = useGetFavoriteMoverList();

  useEffect(() => {
    if (inView) {
      !isFetching && hasNextPage && fetchNextPage();
    }
  }, [isFetching, inView, hasNextPage, fetchNextPage]);

  if (isPending) return <Loader msg="찜한 기사님 목록을 불러오고 있어요." />;

  if (isError)
    return <Message msg="찜한 기사님 목록을 불러오는 중 오류가 발생했어요." />;

  const pages = data?.pages || [];
  const isEmpty = pages[0].list.length === 0 || pages?.length === 0;

  if (isEmpty) return <EmptyList text="찜한 기사님 목록이 비어 있어요." />;

  return (
    <>
      <ul
        className={cn(
          "max-w-[1400px] mx-auto bg-bg-100 grid grid-cols-1 pc:grid-cols-2 gap-[24px] tablet:gap-[32px] pc:gap-x-[24px] pc:gap-y-[48px]"
        )}
      >
        {pages.map((page) =>
          page.list.map((mover: FavoriteMoverData) => {
            return (
              <FavoriteMoverCard data={mover} key={`favorite-${mover.id}`} />
            );
          })
        )}
      </ul>

      <div ref={ref}>
        {isFetchingNextPage ? (
          <Loader msg="찜한 기사님 목록 불러오는중" />
        ) : hasNextPage ? (
          <Loader msg="새 목록 불러오는 중" />
        ) : (
          <Message msg="더 불러올 기사님이 없습니다." />
        )}
      </div>
    </>
  );
}
