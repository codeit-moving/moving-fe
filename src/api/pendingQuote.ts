import { axiosInstance } from "./axios";
import axios from "axios";

interface RequestQuotesResponse {
  id: number;
  list: {
    id: number;
    cost: number;
    comment: string;
    service: number;
    isConfirmed: boolean;
    mover: {
      id: number;
      imageUrl: string | null;
      nickname: string;
      career: number;
      isDesignated: boolean;
      isFavorite: boolean;
      reviewCount: number;
      favoriteCount: number;
      confirmCount: number;
      rating: {
        "1": number;
        "2": number;
        "3": number;
        "4": number;
        "5": number;
        average: number;
        totalCount: number;
        totalSum: number;
      };
    };
  }[];
}

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
  id: number;
  service: number;
  movingDate: string; // ISO Date String
  pickupAddress: string;
  dropOffAddress: string;
  name: string;
  requestDate: string; // ISO Date String
  isConfirmed: boolean;
}

interface CustomerMovingRequestsResponse {
  currentPage: number;
  pageSize: number;
  totalPage: number;
  totalCount: number;
  list: MovingRequest[];
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

export const fetchPendingQuotes = async (): Promise<PendingQuotesResponse> => {
  try {
    const response = await axiosInstance.get<PendingQuotesResponse>(
      "/moving-requests/pending-quotes"
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching pending quotes:", error);

    // 404일 경우 빈 배열과 함께 totalCount도 반환
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return {
        list: [],
        totalCount: 0,
      };
    }

    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";
    throw new Error(`Failed to fetch pending quotes: ${errorMessage}`);
  }
};

export const fetchCustomerMovingRequests =
  async (): Promise<CustomerMovingRequestsResponse> => {
    try {
      const response = await axiosInstance.get<CustomerMovingRequestsResponse>(
        `/moving-requests/by-customer`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching customer moving requests:", error);
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";

      if (axios.isAxiosError(error) && error.response?.status === 404) {
        throw new Error("No matching moving requests found");
      }

      throw new Error(
        `Failed to fetch customer moving requests: ${errorMessage}`
      );
    }
  };

export const fetchRequestQuotes = async (
  requestId: number,
  isCompleted: boolean
): Promise<RequestQuotesResponse> => {
  try {
    const response = await axiosInstance.get<RequestQuotesResponse>(
      `/moving-requests/${requestId}/quotes?isCompleted=${isCompleted}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching request quotes:", error);
    const errorMessage =
      error instanceof Error ? error.message : "An unknown error occurred";

    if (axios.isAxiosError(error) && error.response?.status === 404) {
      throw new Error("No quotes found for this request");
    }

    throw new Error(`Failed to fetch request quotes: ${errorMessage}`);
  }
};

export type {
  PendingQuotesResponse,
  Quote,
  Mover,
  MovingRequest,
  Rating,
  CustomerMovingRequestsResponse,
  RequestQuotesResponse,
};
