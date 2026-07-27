import {
  galleryImagesSchema,
  imageFavouriteResponseSchema,
  imageUploadResponseSchema,
} from './validators';

const API_KEY = import.meta.env.VITE_CAT_API_KEY;

export const api = {
  /**
   * Retrieve the uploaded images for a user using the Cat API.
   * @param param0.userId the id to segment images by
   * @param param0.page current page of search results
   * @param param0.limit maximum number of records to return
   * @returns validated array of images
   */
  getUploadedImages: async ({
    userId,
    page,
    limit,
  }: {
    userId: string;
    page: number;
    limit: number;
  }) => {
    const url = new URL('https://api.thecatapi.com/v1/images');
    url.searchParams.append('sub_id', userId);
    url.searchParams.append('page', page.toString());
    url.searchParams.append('limit', limit.toString());

    const res = await fetch(url.href, {
      headers: {
        'x-api-key': API_KEY,
      },
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }

    const data = await res.json();
    const parsedImages = galleryImagesSchema.safeParse(data);
    if (!parsedImages.success) {
      throw new Error('Failed to parse images');
    }

    return parsedImages.data;
  },

  /**
   * Upload an image using the Cat API.
   * @param param0.userId the id to segment images by
   * @param param0.image the cat image to upload
   */
  uploadImage: async ({ userId, image }: { userId: string; image: File }) => {
    const formData = new FormData();
    formData.append('sub_id', userId);
    formData.append('file', image);

    const res = await fetch('https://api.thecatapi.com/v1/images/upload', {
      method: 'POST',
      body: formData,
      headers: {
        'x-api-key': API_KEY,
      },
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }

    const data = await res.json();
    const parsedRes = imageUploadResponseSchema.safeParse(data);
    if (!parsedRes.success || parsedRes.data.approved === 0) {
      throw new Error('Failed to verify image');
    }
  },

  /**
   * Favourite an image using the Cat API.
   * @param param0.userId the id to segment images by
   * @param param0.imageId the id of the image to favourite
   */
  favouriteImage: async ({
    userId,
    imageId,
  }: {
    userId: string;
    imageId: string;
  }) => {
    const res = await fetch('https://api.thecatapi.com/v1/favourites', {
      method: 'POST',
      body: JSON.stringify({
        sub_id: userId,
        image_id: imageId,
      }),
      headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json',
      },
    });
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }

    const data = await res.json();
    const parsedRes = imageFavouriteResponseSchema.safeParse(data);
    if (!parsedRes.success) {
      throw new Error('Failed to favourite image');
    }

    return parsedRes.data.id;
  },

  /**
   * Unfavourite an image using the Cat API.
   * @param param0.favouriteId the id of the favourite to remove
   */
  unfavouriteImage: async ({ favouriteId }: { favouriteId: number }) => {
    const res = await fetch(
      `https://api.thecatapi.com/v1/favourites/${encodeURIComponent(favouriteId)}`,
      {
        method: 'DELETE',
        headers: {
          'x-api-key': API_KEY,
        },
      },
    );
    if (!res.ok) {
      const message = await res.text();
      throw new Error(message);
    }
  },
};
