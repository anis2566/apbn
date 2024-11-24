import { Designation } from "@prisma/client";
import { z } from "zod";

export const CommitteeMember = z.object({
  name: z.string().min(1, { message: "required" }),
  designation: z
    .nativeEnum(Designation)
    .refine((val) => Object.values(Designation).includes(val), {
      message: "required",
    }),
  imageUrl: z.string().min(1, { message: "required" }),
});

export type CommitteeMemberType = z.infer<typeof CommitteeMember>;
