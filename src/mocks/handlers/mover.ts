import { http, HttpResponse } from "msw";
import { MOVER_LIST, MOVER_MY_PAGE } from "../data/mover";

interface QueryParams {
  nextCursorId?: number;
  order?: "review" | "career" | "confirm" | "rating";
  limit?: number | 10;
  keyword?: string;
  region?: number;
  service?: number;
  isFavorite?: boolean;
}

export const moverHandlers = [
  http.get("/mock/movers/my-profile", () => {
    // console.log("Intercepted my-profile request");
    return HttpResponse.json(MOVER_MY_PAGE);
  }),
  http.get("/mock/movers/:id", ({ params }) => {
    const { id } = params;
    const { list } = MOVER_LIST;
    const mover = list.find((m) => m.id === Number(id));

    if (!mover) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json({
      ...mover,
      isConfirmed: Math.random() > 0.5,
      description:
        "안녕하세요. 이사업계 경력 7년으로 안전한 이사를 도와드리는 김코드입니다.고객님의 물품을 소중하고 안전하게 운송하여 드립니다. 소형이사 및 가정이사 서비스를 제공하며 서비스 가능 지역은 서울과 경기권입니다.",
    });
  }),
  http.get("/mock/movers", ({ request }) => {
    const url = new URL(request.url);
    const params: QueryParams = {
      nextCursorId: Number(url.searchParams.get("nextCursorId")) || undefined,
      order: url.searchParams.get("order") as QueryParams["order"],
      limit: Number(url.searchParams.get("limit")) || 10,
      keyword: url.searchParams.get("keyword") || undefined,
      region: Number(url.searchParams.get("region")) || undefined,
      service: Number(url.searchParams.get("service")) || undefined,
      isFavorite: url.searchParams.get("isFavorite") === "true",
    };

    let filteredList = [...MOVER_LIST.list];

    // Apply filters
    if (params.keyword) {
      filteredList = filteredList.filter((mover) =>
        mover.nickname.includes(params.keyword!)
      );
    }

    if (params.region) {
      filteredList = filteredList.filter((mover) =>
        mover.regions.includes(params.region!)
      );
    }

    if (params.service) {
      filteredList = filteredList.filter((mover) =>
        mover.services.includes(params.service!)
      );
    }

    if (params.isFavorite) {
      filteredList = filteredList.filter((mover) => mover.isFavorite);
    }

    // Apply sorting
    if (params.order) {
      filteredList.sort((a, b) => {
        switch (params.order) {
          case "rating":
            return b.rating.average - a.rating.average;
          case "review":
            return b.reviewCount - a.reviewCount;
          case "career":
            return b.career - a.career;
          case "confirm":
            return b.confirmCount - a.confirmCount;
          default:
            return 0;
        }
      });
    }

    // Apply cursor pagination
    if (params.nextCursorId) {
      const cursorIndex = filteredList.findIndex(
        (mover) => mover.id === params.nextCursorId
      );
      filteredList = filteredList.slice(cursorIndex);
    }

    // Apply limit (with default value of 10)
    const limit = params.limit ?? 10;
    const limitedList = filteredList.slice(0, limit);
    const nextCursor =
      limitedList.length < limit || !filteredList[limit]
        ? null
        : filteredList[limit].id;

    return HttpResponse.json({
      list: limitedList,
      nextCursor,
    });
  }),
];
