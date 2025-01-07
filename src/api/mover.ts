import { AxiosRequestConfig } from "axios";

import { type MoverDetails } from "@/components/cards/MoverInfoCard";
import { axiosInstance } from "./axios";
import { BaseMoverData } from "@/types/mover";
import { REGION_CODES } from "@/variables/regions";
import { RatingData } from "@/types/mover";

const PATH = "/movers";

interface GetMoverListParams {
  cookie?: string;
  nextCursorId?: string | number | null;
  order?: string;
  limit?: number;
  keyword?: string;
  region?: number | null;
  service?: number | null;
  isFavorite?: boolean;
}

export interface MoverData {
  id: number;
  imageUrl: string | null;
  services: number[];
  nickname: string;
  name: string;
  career: number;
  regions: (typeof REGION_CODES)[keyof typeof REGION_CODES][];
  introduction: string;
  isDesignated: boolean;
  isFavorite: boolean;
  reviewCount: number;
  favoriteCount: number;
  isConfirmed: boolean;
  confirmCount: number;
  rating: RatingData;
}

export interface GetMoverListResponseData {
  nextCursor?: string | number | null;
  hasNext: false;
  list: MoverData[];
}

export const getMoverList = async ({
  cookie,
  nextCursorId,
  order,
  limit,
  keyword,
  region,
  service,
  isFavorite = false,
}: GetMoverListParams): Promise<GetMoverListResponseData> => {
  console.log("getMoverList");
  const headers: AxiosRequestConfig["headers"] = cookie
    ? { Cookie: cookie }
    : undefined;

  const params = {
    ...(nextCursorId && { nextCursorId: nextCursorId }),
    ...(order && { order: order }),
    ...(limit && { limit: limit }),
    ...(keyword?.trim() && { keyword }),
    ...(region && { region: region }),
    ...(service && { service: service }),
    ...(isFavorite && { isFavorite: isFavorite }),
  };

  try {
    const response = await axiosInstance.get(PATH, {
      params,
      ...(headers && { headers }),
    });
    return response.data;
  } catch (err) {
    console.error(err);
    return {
      nextCursor: null,
      hasNext: false,
      list: [],
    };
  }
};

/**
 * 1. Endpoint:  `POST /:id/favorite`
 * 2. Description: 기사 찜하기
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=/%3Aid/favorite%20(%20POST%20)
 */
export async function addMoverFavorite(moverId: number) {
  const path = `${PATH}/${moverId}/favorite`;
  const res = await axiosInstance.post(path);

  return res;
}

/**
 * 1. Endpoint:  `DELETE /:id/favorite`
 * 2. Description: 기사 찜 취소하기
 * 3. Request : access-token 쿠키 전달
 * 4. link : https://bubble-city-3ac.notion.site/API-14d9702f08878032932ee08ab2c19fb0#:~:text=/%3Aid/favorite%20(%20DELETE%20)
 */
export async function deleteMoverFavorite(moverId: number) {
  const path = `${PATH}/${moverId}/favorite`;
  const res = await axiosInstance.delete(path);

  return res;
}

// (일반유저) 기사님 상세 페이지
export async function getMoverById(moverId: number): Promise<MoverDetails> {
  const response = await axiosInstance.get(`${PATH}/${moverId}`);
  return response.data;
}

export interface MoverMyPageResponse extends BaseMoverData {
  name: string;
  services: number[];
  regions: number[];
  introduction: string;
  isDesignated: boolean;
  isFavorite: boolean;
  favoriteCount: number;
}

// (기사님) 마이 페이지
export async function getMoverProfile(): Promise<MoverMyPageResponse> {
  const response = await axiosInstance.get(`${PATH}/my-profile`);
  return response.data;
}

export const editMoverProfile = async (userData: FormData) => {
  const response = await axiosInstance.patch(`${PATH}`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const moverProfile = async (formData: FormData) => {
  const response = await axiosInstance.post(`${PATH}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// 기사님 찜하기
export async function createFavoriteMover(moverId: number): Promise<any> {
  const response = await axiosInstance.post(`${PATH}/${moverId}/favorite`);
  return response.data;
}

// 기사님 찜하기 취소
export async function deleteFavoriteMover(moverId: number): Promise<any> {
  const response = await axiosInstance.delete(`${PATH}/${moverId}/favorite`);
  return response.data;
}
