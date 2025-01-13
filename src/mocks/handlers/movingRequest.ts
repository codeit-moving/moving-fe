import { http, HttpResponse } from "msw";
import { PAST_REQUESTS, MOVING_REQUESTED_QUOTES } from "../data/movingQuotes";
import { MOVING_REQUESTS_WITH_STATUS } from "../data/pendingQuotes";
export const movingRequestHandlers = [
  http.get("/mock/moving-requests/by-customer", ({ request }) => {
    const url = new URL(request.url);
    const pageSize = parseInt(url.searchParams.get("pageSize") || "5", 10);
    const pageNum = parseInt(url.searchParams.get("pageNum") || "1", 10);

    const startIndex = (pageNum - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedRequests = PAST_REQUESTS.list.slice(startIndex, endIndex);

    if (paginatedRequests.length === 0) {
      return HttpResponse.json(
        {
          path: "/moving-requests/by-customer",
          method: "GET",
          message: "Not Found",
          data: { message: "조건에 맞는 견적요청 목록이 없습니다." },
          date: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      currentPage: pageNum,
      pageSize: pageSize,
      totalPage: Math.ceil(PAST_REQUESTS.totalCount / pageSize),
      totalCount: PAST_REQUESTS.totalCount,
      list: paginatedRequests,
    });
  }),

  // 2. 특정 이사 요청 ID에 대한 견적서 목록 조회
  http.get("/mock/moving-requests/:id/quotes", ({ params, request: req }) => {
    const { id } = params;
    const url = new URL(req.url);
    const isCompleted = url.searchParams.get("isCompleted") === "true";

    // 해당 이사 요청 ID 찾기
    const request = MOVING_REQUESTED_QUOTES.list.find(
      (item) => item.id === Number(id)
    );

    if (!request) {
      return HttpResponse.json(
        {
          path: `/mock/moving-requests/${id}/quotes`,
          method: "GET",
          message: "Not Found",
          data: { message: "견적서 목록이 없습니다." },
          date: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    // 견적서 목록에서 필터링
    const filteredQuotes = MOVING_REQUESTED_QUOTES.list.filter((quote) =>
      isCompleted ? quote.isConfirmed : true
    );

    if (filteredQuotes.length === 0) {
      return HttpResponse.json(
        {
          path: `/mock/moving-requests/${id}/quotes`,
          method: "GET",
          message: "Not Found",
          data: { message: "견적서 목록이 없습니다." },
          date: new Date().toISOString(),
        },
        { status: 404 }
      );
    }

    return HttpResponse.json({
      id: request.id,
      list: filteredQuotes,
    });
  }),

  // 유져 대기 견적서 (status: PENDING)
  http.get("/mock/moving-requests/pending-quotes", () => {
    const filteredQuotes = MOVING_REQUESTS_WITH_STATUS.list.filter(
      (quote) => quote.movingRequest.status === "PENDING"
    );
    // console.log("filteredQuotes", filteredQuotes);
    return HttpResponse.json({
      totalCount: filteredQuotes.length,
      list: filteredQuotes,
    });
  }),
];
