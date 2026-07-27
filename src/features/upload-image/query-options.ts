import { mutationOptions } from '@tanstack/react-query';

/**
 * Mutation for uploading images.
 * @param param0.userId - the id to segment images by
 */
export const uploadImageMutationOptions = ({ userId }: { userId: string }) =>
  mutationOptions({
    mutationFn: async ({ image }: { image: File }) => {
      const formData = new FormData();
      formData.append('file', image);
      formData.append('sub_id', userId);

      const res = await fetch('https://api.thecatapi.com/v1/images/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'x-api-key': import.meta.env.VITE_CAT_API_KEY,
        },
      });
      if (!res.ok) {
        const message = await res.text();
        throw new Error(message);
      }

      const data: { approved: 0 | 1 } = await res.json();
      if (data.approved === 0) {
        throw new Error('Failed to verify image.');
      }
    },
  });
