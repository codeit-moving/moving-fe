import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewKey } from "../queryKeys";
import { createReview } from "../review";
import { type CreateReviewData } from "@/types/review";

export function useReviewMutation(confirmedQuoteId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (submitData: CreateReviewData) =>
      createReview(confirmedQuoteId, submitData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: reviewKey.lists() });
    },
  });
}
