import { CouponStatus } from "@prisma/client";
import { z } from "zod";

export const CouponSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  code: z.string().min(1, { message: "required" }),
  value: z.number().min(1, { message: "required" }),
  expire: z.date().min(new Date(), { message: "required" }),
  status: z
    .nativeEnum(CouponStatus)
    .refine((val) => Object.values(CouponStatus).includes(val), {
      message: "required",
    }),
});

export type CouponSchemaType = z.infer<typeof CouponSchema>;
