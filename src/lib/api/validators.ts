import { z } from 'zod';

export const galleryImageSchema = z.object({
  id: z.coerce.string(),
  url: z.string(),
  vote: z.object({ id: z.number(), value: z.number() }).optional(),
  favourite: z.object({ id: z.number() }).optional(),
});
export type GalleryImage = z.infer<typeof galleryImageSchema>;

export const galleryImagesSchema = z.array(galleryImageSchema);

export const imageUploadResponseSchema = z.object({
  approved: z.union([z.literal(0), z.literal(1)]),
});

export const imageFavouriteResponseSchema = z.object({
  id: z.number(),
});

export const imageVoteResponseSchema = z.object({
  id: z.number(),
  value: z.number(),
});
