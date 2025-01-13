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
      console.error("지정 견적 요청하기 에러 : ", error);
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
