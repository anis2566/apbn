import { z } from "zod";

export enum Status {
  Active = "Active",
  Inactive = "Inactive",
}

export const CouponSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  code: z.string().min(1, { message: "required" }),
  value: z.number().min(1, { message: "required" }),
  expire: z.date().min(new Date(), { message: "required" }),
  status: z
    .nativeEnum(Status)
    .refine((val) => Object.values(Status).includes(val), {
      message: "required",
    }),
});

export type CouponSchemaType = z.infer<typeof CouponSchema>;
