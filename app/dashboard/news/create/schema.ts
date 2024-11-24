import { PublishStatus } from "@prisma/client";
import { z } from "zod";

export const NewsSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  news: z.string().min(1, { message: "required" }),
  imageUrl: z.string().min(1, { message: "required" }),
  status: z
    .nativeEnum(PublishStatus)
    .refine((val) => Object.values(PublishStatus).includes(val), {
      message: "required",
    }),
});

export type NewsSchemaType = z.infer<typeof NewsSchema>;
