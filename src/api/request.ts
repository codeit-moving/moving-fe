import { axiosInstance } from "./axios";

interface MovingRequestData {
  service: number;
  movingDate: string;
  pickupAddress: string;
  dropOffAddress: string;
  region: number;
}

export const movingRequests = {
  create: async (data: MovingRequestData) => {
    try {
      const response = await axiosInstance.post("/moving-requests", data);
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.data?.message;

      if (errorMessage === "활성중인 이사요청이 있습니다.") {
        throw new Error("ACTIVE_REQUEST_EXISTS");
      }

      // 다른 에러는 로깅하고 전파
      console.error("Error creating moving request:", {
        error: error.response?.data || error.message,
        requestData: data,
      });
      throw error;
    }
  },
};
