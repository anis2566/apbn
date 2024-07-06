import { z } from "zod";

export enum Status {
  Active = "Active",
  Inactive = "Inactive",
}

export const NoticeSchema = z.object({
  notice: z.string().min(1, { message: "required" }),
  status: z
    .nativeEnum(Status)
    .refine((val) => Object.values(Status).includes(val), {
      message: "required",
    }),
});

export type NoticeSchemaType = z.infer<typeof NoticeSchema>;
