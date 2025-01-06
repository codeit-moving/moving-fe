import { axiosInstance } from "./axios";
import { type OffsetResponse, type OffsetParams } from "@/types/api";
import { type MyReviewCardData } from "@/components/cards/MyReviewCard";
import { type ReviewMoverData } from "@/components/common/card/ReviewMover";
import { type CustomerReviewData } from "@/components/review/CustomerReview";
import { type CreateReviewData } from "@/types/review";

const PATH = "/reviews";

// 내가 작성한 리뷰 부를 api
export const getMyReviewList = async ({
  pageNum = 1,
  pageSize = 5,
}: OffsetParams): Promise<OffsetResponse<MyReviewCardData>> => {
  const response = await axiosInstance.get(`${PATH}/me`, {
    params: { pageNum, pageSize },
  });
  return response.data;
};

// 작성 가능한 리뷰 부를 api
export const getAvailableReviewList = async ({
  pageNum = 1,
  pageSize = 5,
}: OffsetParams): Promise<OffsetResponse<ReviewMoverData>> => {
  const response = await axiosInstance.get(`${PATH}/available`, {
    params: { pageNum, pageSize },
  });
  return response.data;
};

// 특정 기사의 리뷰 목록 부를 api
export const getMoversReviewList = async ({
  moverId,
  pageNum = 1,
  pageSize = 5,
}: OffsetParams & { moverId: number }): Promise<
  OffsetResponse<CustomerReviewData>
> => {
  const response = await axiosInstance.get(`${PATH}/mover/${moverId}`, {
    params: { pageNum, pageSize },
  });
  return response.data;
};

interface CreateReviewResponse {
  id: number;
  rating: number;
  imageUrl: string[];
  content: string;
}

//리뷰 작성 하기
export const createReview = async (
  reviewData: CreateReviewData
): Promise<CreateReviewResponse> => {
  const formData = new FormData();

  formData.append("confirmedQuoteId", String(reviewData.confirmedQuoteId));
  formData.append("rating", String(reviewData.rating));
  formData.append("content", reviewData.content);

  reviewData.images?.forEach((image) => {
    formData.append("imageUrl", image);
  });

  const response = await axiosInstance.post(`${PATH}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
};
