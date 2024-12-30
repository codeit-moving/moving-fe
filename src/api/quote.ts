import { AxiosRequestConfig } from "axios";

import { axiosInstance } from "./axios";

import { type MoverDetailData } from "@/types/mover";
import {
  type CursorResponse,
  type OffsetResponse,
  type GetQuoteApiResponseData,
  type CursorParams,
} from "@/types/api";
import {
  type SentQuoteData,
  type QuoteDetailsData,
  type ConfirmedQuoteResponse,
} from "@/types/quote";

const PATH = "/quotes";

interface GetQuoteProps {
  cookie?: string;
  quoteId: number;
}

/**
 * 1. Endpoint: `GET /quotes/:id`
 * 2. Description: 견적 상세 조회
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=favorite%2Dlist%20(%20GET%20)-,quotes%20%5B%ED%83%81%EC%9A%B0%ED%98%84%5D,-/%3Aid%20(%20GET%20)
 */
export async function getQuote({ cookie, quoteId }: GetQuoteProps) {
  const headers: AxiosRequestConfig["headers"] = cookie
    ? { Cookie: cookie }
    : undefined;

  const response = await axiosInstance.get(`${PATH}/${quoteId}`, {
    ...(headers && { headers }),
  });

  return response.data;
}

/**
 * 1. Endpoint: `GET /quotes/mover`
 * 2. Description: (기사님) 보낸 견적 목록 조회
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=quotes%20%5B%EA%B0%95%EB%B2%94%EC%A4%80%5D%20%3A%20(%EA%B8%B0%EC%82%AC%EB%8B%98%EC%9D%98)%EB%B3%B4%EB%82%B8%20%EA%B2%AC%EC%A0%81%EC%84%9C%20%EB%AA%A9%EB%A1%9D%20%EC%A1%B0%ED%9A%8C
 */
export async function getSentQuoteList({
  nextCursorId = null,
  limit = 8,
}: CursorParams): Promise<CursorResponse<SentQuoteData>> {
  const response = await axiosInstance.get(`${PATH}/mover`, {
    params: { nextCursorId, limit },
  });

  return response.data;
}

/**
 * 1. Endpoint: `GET /quotes/mover/rejected`
 * 2. Description: (기사님) 요청 반려 목록 조회
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=quotes%20%5B%EA%B0%95%EB%B2%94%EC%A4%80%5D%20%3A%20(%EA%B8%B0%EC%82%AC%EB%8B%98%EC%9D%B4)%20%EB%B0%98%EB%A0%A4%ED%95%9C%20%EC%9D%B4%EC%82%AC%EC%9A%94%EC%B2%AD%20%EB%AA%A9%EB%A1%9D%20%EC%A1%B0%ED%9A%8C
 */
export async function getRejectedQuoteList({
  nextCursorId = null,
  limit = 8,
}: CursorParams): Promise<CursorResponse<QuoteDetailsData>> {
  const response = await axiosInstance.get(`${PATH}/mover/rejected`, {
    params: { nextCursorId, limit },
  });

  return response.data;
}

interface GetSentQuotesDetailData {
  id: number;
  requestDate: string;
  service: number;
  isDesignated: boolean;
  name: string;
  movingDate: string;
  pickupAddress: string;
  dropOffAddress: string;
  isCompleted: boolean;
  isConfirmed: boolean;
  cost: number;
}

/**
 * 1. Endpoint: `GET /quotes/mover/:quoteId`
 * 2. Description: (기사님) 보낸 견적 상세 조회
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=quotes%20%5B%EA%B0%95%EB%B2%94%EC%A4%80%5D%20%3A%20(%EA%B8%B0%EC%82%AC%EB%8B%98%EC%9D%98)%EA%B2%AC%EC%A0%81%EC%84%9C%20%EC%83%81%EC%84%B8%20%EC%A1%B0%ED%9A%8C
 */
export async function getSentQuoteDetail({
  quoteId,
}: {
  quoteId: number;
}): Promise<GetSentQuotesDetailData> {
  const response = await axiosInstance.get(`${PATH}/mover/${quoteId}`);

  return response.data;
}

interface CreateQuoteProps {
  cost: number;
  comment: string;
  movingRequestId: number;
}

/**
 * 1. Endpoint: `POST /quotes`
 * 2. Description: (기사님의)견적서 보내기
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=quotes%20%5B%EA%B0%95%EB%B2%94%EC%A4%80%5D%20%3A%20(%EA%B8%B0%EC%82%AC%EB%8B%98%EC%9D%98)%EA%B2%AC%EC%A0%81%EC%84%9C%20%EB%B3%B4%EB%82%B4%EA%B8%B0
 */
export async function createQuote({
  cost,
  comment,
  movingRequestId,
}: CreateQuoteProps) {
  const response = await axiosInstance.post(`${PATH}`, {
    cost,
    comment,
    movingRequestId,
  });

  return response.data;
}

interface RejectMovingRequestProps {
  comment: string;
  movingRequestId: number;
}

/**
 * 1. Endpoint: `POST /qoutes/mover/:movingRequestId/reject`
 * 2. Description: (기사님의)지정 이사 요청 반려
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=quotes%20%5B%EA%B0%95%EB%B2%94%EC%A4%80%5D%20%3A%20(%EA%B8%B0%EC%82%AC%EB%8B%98%EC%9D%98)%EC%A7%80%EC%A0%95%20%EC%9D%B4%EC%82%AC%20%EC%9A%94%EC%B2%AD%20%EB%B0%98%EB%A0%A4
 * 5. cf. BE에서 QUOTE로 반려 정보 관리
 */
export async function rejectMovingRequest({
  comment,
  movingRequestId,
}: RejectMovingRequestProps) {
  const response = await axiosInstance.post(
    `${PATH}/mover/${movingRequestId}/reject`,
    {
      comment,
    }
  );
  return response.data;
}

/**
 * 1. Endpoint: `POST /confirmed-quotes/:id`
 * 2. Description: (일반)견적서 확정
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=confirmed%2Dquotes%20%5B%ED%83%81%EC%9A%B0%ED%98%84%5D
 */
export async function confirmQuote(
  quoteId: number
): Promise<ConfirmedQuoteResponse> {
  const response = await axiosInstance.post(`/confirmed-quotes/${quoteId}`);

  return response.data;
}
