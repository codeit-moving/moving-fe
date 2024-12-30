import { axiosInstance } from "./axios";

import {
  GetMovingRequestListByMoverParamData,
  GetMovingRequestListByMoverResponseData,
} from "@/types/api";

interface Rating {
  "1": number;
  "2": number;
  "3": number;
  "4": number;
  "5": number;
  totalCount: number;
  totalSum: number;
  average: number;
}

interface Mover {
  id: number;
  nickname: string;
  imageUrl: string | null;
  career: number;
  introduction: string;
  services: number[];
  name: string;
  isDesignated: boolean;
  isFavorite: boolean;
  rating: Rating;
  reviewCount: number;
  confirmCount: number;
  favoriteCount: number;
}

interface MovingRequest {
  service: number;
  movingDate: string;
  pickupAddress: string;
  dropOffAddress: string;
  requestDate: string;
  isConfirmed: boolean;
  status: string;
}

interface Quote {
  id: number;
  cost: number;
  comment: string;
  isConfirmed: boolean;
  movingRequest: MovingRequest;
  mover: Mover;
}

interface PendingQuotesResponse {
  totalCount: number;
  list: Quote[];
}

// 고객의 이사 요청 목록 조회 함수
export const fetchMovingRequests = async (
  pageSize: number = 5,
  pageNum: number = 1
): Promise<PendingQuotesResponse> => {
  try {
    const response = await axiosInstance.get<PendingQuotesResponse>(
      "/moving-requests/by-customer",
      {
        params: {
          pageSize: pageSize,
          pageNum: pageNum,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching moving requests:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(`Failed to fetch moving requests: ${errorMessage}`);
  }
};

// 특정 이사 요청 ID에 대한 견적서 목록 조회 함수
export const fetchQuotesByMovingRequest = async (
  id: number,
  isCompleted: boolean = false
): Promise<Quote[]> => {
  try {
    const response = await axiosInstance.get<PendingQuotesResponse>(
      `/moving-request/${id}/quotes`,
      {
        params: {
          isCompleted: isCompleted.toString(),
        },
      }
    );

    return response.data.list;
  } catch (error) {
    console.error(`Error fetching quotes for moving request ${id}:`, error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    throw new Error(
      `Failed to fetch quotes for moving request ${id}: ${errorMessage}`
    );
  }
};

export type { PendingQuotesResponse, Quote, Mover, MovingRequest, Rating };

const PATH = "/moving-requests";

export async function getMovingRequestListByMover({
  smallMove,
  houseMove,
  officeMove,
  keyword,
  isDesignated,
  orderBy,
  limit,
  cursor,
}: GetMovingRequestListByMoverParamData): Promise<GetMovingRequestListByMoverResponseData> {
  const serviceQuery = `smallMove=${smallMove}&houseMove=${houseMove}&officeMove=${officeMove}`;
  const sortQuery = `&orderBy=${orderBy}`;
  let designateQuery = ``;

  if (isDesignated !== null) {
    designateQuery = `&isDesignated=${isDesignated}`;
  }

  let keywordQuery = ``;

  if (keyword !== null && keyword?.trim().length !== 0) {
    keywordQuery = `&keyword=${keyword}`;
  }

  let limitQuery = ``;

  if (limit) {
    limitQuery = `&limit=${limit}`;
  }

  let cursorQuery = ``;

  if (cursor !== "" && cursor) {
    cursorQuery = `&cursor=${cursor}`;
  }

  const query = `${serviceQuery}${sortQuery}${designateQuery}${keywordQuery}${limitQuery}${cursorQuery}&isQuoted=false&isPastRequest=false`;

  try {
    const response = await axiosInstance.get(`${PATH}/by-mover?${query}`);

    if (response.status !== 200) {
      console.error("Fetch API 호출 오류:", response.statusText);
      throw new Error("API 요청 실패");
    }

    // const data = await response.json();
    console.log("query : ", query);
    console.log("response.data : ", response.data);

    return response.data;
  } catch (err: any) {
    console.error("Fetch API 호출 오류:", err.message);
    return {
      list: [],
      serviceCounts: { smallMove: 0, houseMove: 0, officeMove: 0 },
      requestCounts: { total: 0, designated: 0 },
      nextCursor: "",
      hasNext: false,
    };
  }
}
