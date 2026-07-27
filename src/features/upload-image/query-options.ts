import { mutationOptions } from '@tanstack/react-query';
import { getUploadedImagesQueryOptions } from '#/features/gallery/query-options';
import { api } from '#/lib/api/api';

/**
 * Mutation for uploading images.
 * @param param0.userId - the id to segment images by
 */
export const uploadImageMutationOptions = ({ userId }: { userId: string }) =>
  mutationOptions({
    mutationFn: async ({ image }: { image: File }) => {
      await api.uploadImage({ userId, image });
    },
    onSuccess: (_, __, ___, context) => {
      // Invalidate gallery cache on upload
      context.client.invalidateQueries({
        queryKey: getUploadedImagesQueryOptions({ userId }).queryKey,
      });
    },
  });
