import { z } from "zod";

export const GallerySchema = z.object({
  images: z.array(z.string()).min(1, { message: "required" }),
});

export type GallerySchemaType = z.infer<typeof GallerySchema>;
