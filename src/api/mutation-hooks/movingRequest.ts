import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDesignatedMover, cancelDesignatedMover } from "../movingRequest";
import NiceModal from "@ebay/nice-modal-react";
import { moverKey } from "../queryKeys";

interface DesignatedMover {
  moverId: number;
  isDesignated: boolean;
}

interface DesignatedResponse {
  data: {
    message: string;
    designateRemain: number;
  };
  status: number;
}

export function useDesignatedMoverMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ moverId, isDesignated }: DesignatedMover) => {
      const apiFunction = !isDesignated
        ? createDesignatedMover
        : cancelDesignatedMover;
      return apiFunction(moverId);
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || "요청 처리 중 오류가 발생했습니다.";

      NiceModal.show("AlertModal", {
        title: "오류 발생",
        msg: errorMessage,
        type: "error",
      });
    },
    onSuccess: (response: DesignatedResponse, { moverId }) => {
      queryClient.invalidateQueries({ queryKey: moverKey.detail(moverId) });
      NiceModal.show("AlertModal", {
        msg: `남은 지정요청 횟수: ${response.data.designateRemain}`,
        title: response.data.message,
      });
    },
  });
}
