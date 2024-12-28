import { QueryClient, MutationCache } from "@tanstack/react-query";
import NiceModal from "@ebay/nice-modal-react";

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
    onError: (error: any) => {
      const errorMessage = error.message;
      console.log("mutationCache error : ", error);

      //422 일반 요청 없이 지정견적 요청시
      if (error.status === 422) {
        NiceModal.show("AlertModal", {
          msg: errorMessage,
          title: "지정 견적 요청하기",
          buttonText: "지정 견적 요청",
        });
      }
      if (error.status !== 422 && errorMessage) {
        NiceModal.show("AlertModal", { msg: errorMessage });
      }
    },
  }),
});

export default queryClient;
