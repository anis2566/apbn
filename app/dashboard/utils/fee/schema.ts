import { z } from "zod";

export const FeeSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  amount: z.number().min(1, { message: "required" }),
  discountAmount: z.number().min(1, {message: "required"})
});

export type FeeSchemaType = z.infer<typeof FeeSchema>;
