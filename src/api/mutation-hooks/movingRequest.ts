import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDesignatedMover, cancelDesignatedMover } from "../movingRequest";
import NiceModal from "@ebay/nice-modal-react";
import { moverKey } from "../queryKeys";

interface DesignatedMover {
  moverId: number;
  isDesignated: boolean;
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
      if (error.response.status === 422) {
        NiceModal.show("QuoteRequestModal");
      }
    },
    onSuccess: (_, { moverId }) => {
      queryClient.invalidateQueries({ queryKey: moverKey.detail(moverId) });
    },
  });
}
