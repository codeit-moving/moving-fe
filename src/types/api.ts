import { QuoteData } from "./quote";
import {
  MovingRequestDataByMover,
  MovingRequestDataWithComplete,
} from "./movingRequest";
import { MoverDetailData } from "./mover";

// API 구조 참고
export interface GetQuoteApiResponseData extends QuoteData {
  isConfirmed: boolean;
  movingRequest: MovingRequestDataWithComplete;
  mover: MoverDetailData;
}

export interface CursorResponse<T> {
  nextCursor: number | null;
  hasNext: boolean;
  list: T[];
}

export interface OffsetResponse<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalCounts: number;
  list: T[];
}

export interface CursorParams {
  limit?: number;
  nextCursorId?: number | null;
}

export interface OffsetParams {
  pageNum?: number;
  pageSize?: number;
}

export interface serviceCounts {
  smallMove: number;
  houseMove: number;
  officeMove: number;
}
export interface requestCounts {
  total: number;
  designated: number;
}

// API 구조 참고
export interface GetMovingRequestListByMoverResponseData {
  list: MovingRequestDataByMover[];
  serviceCounts: serviceCounts;
  requestCounts: requestCounts;
  nextCursor: number | string;
  hasNext: boolean;
}

export interface GetMovingRequestListByMoverParamData {
  cookie?: string;
  smallMove: boolean;
  houseMove: boolean;
  officeMove: boolean;
  keyword?: string;
  isDesignated: boolean | null;
  orderBy: "recent" | "movingDate";
  limit: number;
  cursor: number | string | null;
}
