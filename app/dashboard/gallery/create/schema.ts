import { z } from "zod";

export const GallerySchema = z.object({
  title: z.string().min(1, { message: "required" }),
  imageUrl: z.string().min(1, { message: "required" }),
});

export type GallerySchemaType = z.infer<typeof GallerySchema>;
