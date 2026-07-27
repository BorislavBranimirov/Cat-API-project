import { infiniteQueryOptions } from '@tanstack/react-query';
import { api } from '#/lib/api/api';

/**
 * Maximum number of records per page
 */
const LIMIT = 12;

/**
 * Query for loading uploaded images.
 * @param param0.userId - the id to segment images by
 */
export const getUploadedImagesQueryOptions = ({ userId }: { userId: string }) =>
  infiniteQueryOptions({
    queryKey: ['uploaded-images', { userId }],
    queryFn: async ({ pageParam }) => {
      const images = await api.getUploadedImages({
        userId,
        page: pageParam,
        limit: LIMIT,
      });

      return { images, page: pageParam };
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      // If the last page returned less than LIMIT records, there is no next
      // page
      if (lastPage.images.length < LIMIT) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });
