import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getMoverList, getMoverProfile } from "../mover";
import { moverKey } from "../queryKeys";
import { getMoverById } from "../mover";
import { GetMoverListResponseData } from "../mover";

export const useGetMoverList = ({
  service,
  region,
  keyword,
  order,
  initialData,
}: {
  service?: number | null;
  region?: number | null;
  keyword?: string;
  order?: string;
  initialData: GetMoverListResponseData;
}) => {
  return useInfiniteQuery({
    queryKey: moverKey.list(),
    queryFn: ({
      pageParam,
    }: {
      pageParam: string | number | null | undefined;
    }) =>
      getMoverList({
        limit: 10,
        nextCursorId: pageParam ?? null,
        service,
        region,
        keyword,
        order,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
    initialData: {
      pages: [initialData],
      pageParams: [null],
    },
  });
};

//내가 찜한 기사님 목록 조회
export const useGetFavoriteMoverList = () => {
  return useInfiniteQuery({
    queryKey: moverKey.favorite(),
    queryFn: () =>
      getMoverList({
        isFavorite: true,
        limit: 10,
        nextCursorId: null,
      }),
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: null,
  });
};

// 기사님 상세 페이지
export const useGetMoverDetail = (moverId: number) => {
  return useQuery({
    queryKey: moverKey.detail(moverId),
    queryFn: () => getMoverById(moverId),
    enabled: !!moverId,
  });
};

// 기사 마이페이지
export const useGetMoverMyPage = () => {
  return useQuery({
    queryKey: moverKey.myPage(),
    queryFn: () => getMoverProfile(),
  });
};
