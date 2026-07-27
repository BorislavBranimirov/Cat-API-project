import { mutationOptions } from '@tanstack/react-query';
import { toast } from 'sonner';
import { getUploadedImagesQueryOptions } from '#/features/gallery/query-options';
import { api } from '#/lib/api/api';

/**
 * Mutation for updating the favourite status on an image.
 * @param param0.userId - the id to segment images by
 */
export const updateImageFavouriteMutationOptions = ({
  userId,
}: {
  userId: string;
}) =>
  mutationOptions({
    mutationFn: async ({
      imageId,
      favouriteIdToRemove,
    }: {
      imageId: string;
      favouriteIdToRemove: number | undefined;
    }) => {
      if (favouriteIdToRemove !== undefined) {
        await api.unfavouriteImage({
          favouriteId: favouriteIdToRemove,
        });
      } else {
        const favouriteId = await api.favouriteImage({
          userId,
          imageId,
        });

        return favouriteId;
      }
    },
    onError: (err) => {
      toast.error(`Failed to update image: ${err.message}`);
    },
    onSuccess: (favouriteId, params, ___, context) => {
      toast.success(
        `Successfully ${favouriteId ? 'favourited' : 'unfavourited'} the image`,
      );

      // Update gallery cache on favourite status change
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

                // If the favourite was deleted, remove it from the image
                if (!favouriteId) {
                  const { favourite, ...userWithoutFavourite } = image;
                  return userWithoutFavourite;
                }

                // Otherwise, add its id to the image
                return {
                  ...image,
                  favourite: {
                    id: favouriteId,
                  },
                };
              }),
            })),
          };
        },
      );
    },
  });
