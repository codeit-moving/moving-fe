import axios from "axios";
import { NextApiRequest } from "next";
import Swal from "sweetalert2";

interface AxiosResponseError {
  path: string;
  method: string;
  message: string;

  date: string;
  status?: number;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_MOCKING === "enabled"
    ? "/mock" // mocking URL
    : "/api"; // 실제 API URL

const commonConfig = {
  headers: {
    "Content-Type": "application/json",
  },
};

// CSR 전용 인스턴스
export const axiosCSRInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  ...commonConfig,
});

// SSR 전용 인스턴스
export const axiosSSRInstance = axios.create({
  baseURL:
    process.env.NEXT_PUBLIC_API_URL || "https://moving-be-1.onrender.com",
  withCredentials: true,
  ...commonConfig,
});

export const setSSRHeaders = (req: NextApiRequest) => {
  if (req?.headers?.cookie) {
    axiosSSRInstance.defaults.headers.common["Cookie"] = req.headers.cookie;
  }
};

// SSR/CSR 환경에 따라 자동 인스턴스 선택택
export const axiosInstance =
  typeof window === "undefined" ? axiosSSRInstance : axiosCSRInstance;

axiosInstance.interceptors.request.use(
  async (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // redirect 데이터가 data 객체 안에 있는 경우를 처리
    if (error.response?.data?.data?.redirect === true) {
      try {
        const result = await Swal.fire({
          title: "프로필 등록",
          text: error.response?.data?.data?.message || "프로필을 등록해주세요.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "확인",
          confirmButtonColor: "#3085d6",
          cancelButtonText: "취소",
        });

        if (result.isConfirmed && error.response?.data?.data?.redirectUrl) {
          window.location.href = error.response.data.data.redirectUrl;
          return Promise.reject(error);
        }
      } catch (swalError) {
        console.log("[Axios] Swal 에러:", swalError);
      }
    }

    // 403 토큰 관련 에러 처리
    if (error.response?.status === 403) {
      const errorMessage = error.response?.data?.message;
      const isAuthEndpoint =
        error.config.url?.includes("/auth/refresh") ||
        error.config.url?.includes("/users");

      if (
        !isAuthEndpoint &&
        (errorMessage === "Token missing" || errorMessage === "Invalid token")
      ) {
        if (!isRefreshing) {
          isRefreshing = true;
          try {
            await axiosInstance.post("/auth/refresh");
            isRefreshing = false;
            return axiosInstance(error.config);
          } catch (refreshError) {
            isRefreshing = false;
            if (typeof window !== "undefined") {
              window.location.href = "/auth/login";
            }
            return Promise.reject(error);
          }
        }
      }
    }

    // response error handle
    if (error.response) {
      console.error("API response error", error.response.data);

      //여기서 error 정리
      const apiError: AxiosResponseError = {
        path: error.response.data.path,
        method: error.response.data.method,
        message: error.response.data.data.message,
        date: error.response.data.date,
        status: error.response.status,
      };

      return Promise.reject(apiError);
    }

    //request error handle
    if (error.request) {
      console.error("Request Error:", error.request);
      return Promise.reject({
        message: error.request?.responseText || "Network Error",
      });
    }
    console.error("error", error.message);

    return Promise.reject(error);
  }
);

export default axiosInstance;
