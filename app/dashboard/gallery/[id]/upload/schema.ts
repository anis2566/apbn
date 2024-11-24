import { z } from "zod";

const ImageSchema = z.object({
  title: z.string().min(1, {
    message: "required",
  }),
  imageUrl: z.string().min(1, {
    message: "required",
  }),
});

export const GalleryMediaSchema = z.object({
  images: z.array(ImageSchema),
});

export type GalleryMediaSchemaType = z.infer<typeof GalleryMediaSchema>;
