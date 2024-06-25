import { z } from "zod";

export const BanSchema = z.object({
  scoutId: z.string().min(1, { message: "required" }),
  reason: z.string().min(15, { message: "required" }),
});

export type BanSchemaType = z.infer<typeof BanSchema>;
