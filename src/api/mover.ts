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

interface setMoverFavoriteProps {
  moverId: number;
  favorite: boolean;
}

export async function setMoverFavorite({
  moverId,
  favorite,
}: setMoverFavoriteProps) {
  console.log("찜하기 버튼 클릭 - 찜하기 API 호출");

  /**
   * 1. Endpoint:  `GET /:id/favorite`
   * 2. Description: 기사 수정하기
   * 3. Request : access-token 쿠키 전달
   * 4. link : https://www.notion.so/API-14d9702f08878032932ee08ab2c19fb0?pvs=4#a9cab076c4424ed385da592fc320c1d7
   */
  // const path = `${PATH}/${moverId}/favorite?favorite=${favorite}`;
  // const res = await axiosInstance.post(path);

  // return res;

  return new Promise((resolve) => {
    const response = { isFavorite: favorite, id: 0 };
    resolve(response);
  });
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
