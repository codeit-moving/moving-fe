import axiosInstance from "./axios";
import { UserInfo } from "@/types/auth";

const PATH = "/users";

export const editUserInfo = async (userData: UserInfo) => {
  const response = await axiosInstance.patch(`${PATH}`, userData);
  return { status: response.status };
};

export const getUserInfo = async () => {
  const response = await axiosInstance.get(`${PATH}`);
  return response.data;
};
