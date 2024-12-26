import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { quoteKey } from "../queryKeys";
import {
  getSentQuoteList,
  getRejectedQuoteList,
  getSentQuoteDetail,
} from "../quote";

//(기사님) 견적 관리 페이지 (보낸 견적, 반려 목록) 조회
export function useGetManagedQuoteList({ tab }: { tab: number }) {
  const queryKey = tab === 0 ? quoteKey.sent : quoteKey.rejected;
  const getApiFunction = tab === 0 ? getSentQuoteList : getRejectedQuoteList;

  return useInfiniteQuery({
    queryKey: queryKey(),
    queryFn: ({ pageParam = null }) =>
      getApiFunction({
        limit: 10,
        nextCursorId: pageParam,
      }),
    getNextPageParam: (lastPage) => {
      if (!lastPage.nextCursor) {
        return undefined;
      }
      return lastPage.nextCursor;
    },
    initialPageParam: null,
  });
}

//(기사님 ) 견적 상세 페이지
export function useGetSentQuoteDetail(quoteId: number) {
  return useQuery({
    queryKey: quoteKey.detail(quoteId),
    queryFn: () => getSentQuoteDetail({ quoteId }),
    enabled: !!quoteId,
  });
}
