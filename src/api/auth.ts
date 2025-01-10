import { axiosInstance } from "./axios";
import { UserLogin, AuthResponse, UserValidate } from "@/types/auth";

const PATH = "/auth";

export const customerSignup = async (
  userData: FormData
): Promise<AuthResponse> => {
  const response = await axiosInstance.post(
    `${PATH}/signup/customer`,
    userData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};

export const moverSignup = async (
  userData: FormData
): Promise<AuthResponse> => {
  const response = await axiosInstance.post(`${PATH}/signup/mover`, userData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const login = async (userData: UserLogin) => {
  const response = await axiosInstance.post(`${PATH}/signin`, userData);
  return { status: response.status };
};

export const logout = async () => {
  const response = await axiosInstance.post(`${PATH}/signout`);
  return { status: response.status };
};

export const validate = async (userData: UserValidate) => {
  const response = await axiosInstance.post(`${PATH}/validate`, userData);
  return response.data;
};

export const passwordCheck = async (password: string) => {
  const response = await axiosInstance.post(`${PATH}/password`, {
    password,
  });
  return response.data;
};
