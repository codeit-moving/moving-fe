import { AxiosRequestConfig } from "axios";
import { axiosInstance } from "./axios";
import { UserInfo } from "@/types/auth";

const PATH = "/users";

export const editUserInfo = async (userData: UserInfo) => {
  const response = await axiosInstance.patch(`${PATH}`, userData);
  return { status: response.status };
};

export const getUserInfo = async (cookie?: string) => {
  const headers: AxiosRequestConfig["headers"] = cookie
    ? { Cookie: cookie }
    : undefined;

  const response = await axiosInstance.get(`${PATH}`, {
    ...(headers && { headers }),
  });

  return response.data;
};
