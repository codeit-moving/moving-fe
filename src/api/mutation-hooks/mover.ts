import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createFavoriteMover, deleteFavoriteMover } from "../mover";
import { moverKey } from "../queryKeys";

export function useFavoriteMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      moverId,
      isFavorite,
    }: {
      moverId: number;
      isFavorite: boolean;
    }) => {
      const apiFunction = isFavorite
        ? createFavoriteMover
        : deleteFavoriteMover;
      return apiFunction(moverId);
    },

    onMutate: async ({ moverId, isFavorite }) => {
      await queryClient.cancelQueries({
        queryKey: moverKey.detail(moverId),
      });

      const prevData = queryClient.getQueryData(moverKey.detail(moverId));

      queryClient.setQueryData(moverKey.detail(moverId), (old: any) => ({
        ...old,
        isFavorite: isFavorite,
        favoriteCount: isFavorite
          ? (old?.favoriteCount || 0) + 1
          : (old?.favoriteCount || 0) - 1,
      }));

      return { prevData };
    },

    onError: (_, __, context: any) => {
      if (context?.prevData) {
        queryClient.setQueryData(
          ["movers", context.prevData.id],
          context.prevData
        );
      }
    },

    onSettled: (_, __, { moverId }) => {
      queryClient.invalidateQueries({
        queryKey: moverKey.detail(moverId),
      });
      queryClient.invalidateQueries({
        queryKey: moverKey.favorite(),
      });
    },
  });
}
