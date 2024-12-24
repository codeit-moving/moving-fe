import { QueryClient, MutationCache } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface ApiError extends Error {
  response?: {
    data: {
      message: string;
      data?: {
        message: string;
      };
    };
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      retry: 1,
    },
    mutations: {
      retry: 1,
    },
  },
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      const apiError = error as ApiError;
      const message =
        apiError.response?.data?.data?.message ||
        apiError.response?.data?.message;

      if (message) {
        toast.error(message, {
          position: "top-center",
        });
      }
    },
  }),
});

export default queryClient;
