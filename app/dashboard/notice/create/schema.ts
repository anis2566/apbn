import { NoticeStatus } from "@prisma/client";
import { z } from "zod";

export const NoticeSchema = z.object({
  notice: z.string().min(1, { message: "required" }),
  status: z
    .nativeEnum(NoticeStatus)
    .refine((val) => Object.values(NoticeStatus).includes(val), {
      message: "required",
    }),
});

export type NoticeSchemaType = z.infer<typeof NoticeSchema>;
