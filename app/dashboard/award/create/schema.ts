import { z } from "zod";

export const AwardSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  imageUrl: z.string().min(1, { message: "required" }),
});

export type AwardSchemaType = z.infer<typeof AwardSchema>;
