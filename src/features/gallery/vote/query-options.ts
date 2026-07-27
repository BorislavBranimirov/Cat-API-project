import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getUploadedImagesQueryOptions } from '#/features/gallery/query-options';
import { api } from '#/lib/api/api';

/**
 * Mutation for updating the vote count on an image.
 * @param param0.userId - the id to segment images by
 */
export const updateImageVoteMutationOptions = ({
  userId,
}: {
  userId: string;
}) =>
  mutationOptions({
    mutationFn: async ({
      imageId,
      value,
    }: {
      imageId: string;
      value: number;
    }) => {
      const vote = await api.voteOnImage({
        userId,
        imageId,
        value,
      });

      return vote;
    },
    onError: (err) => {
      toast.error(`Failed to vote on image: ${err.message}`);
    },
    onSuccess: (vote, params, ___, context) => {
      // Update gallery cache on vote change
      context.client.setQueryData(
        getUploadedImagesQueryOptions({ userId }).queryKey,
        (currentData) => {
          if (!currentData) {
            return currentData;
          }

          return {
            ...currentData,
            pages: currentData.pages.map((page) => ({
              ...page,
              images: page.images.map((image) => {
                if (params.imageId !== image.id) {
                  return image;
                }

                return {
                  ...image,
                  vote: {
                    id: vote.id,
                    value: vote.value,
                  },
                };
              }),
            })),
          };
        },
      );
    },
  });
