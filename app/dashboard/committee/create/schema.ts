import { CommiteeSection } from "@prisma/client";
import { z } from "zod";

export const CommitteeSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  section: z
    .nativeEnum(CommiteeSection)
    .refine((val) => Object.values(CommiteeSection).includes(val), {
      message: "required",
    }),
  start: z
    .date()
    .refine((date) => date !== null, { message: "required" }),
  end: z
    .date()
    .refine((date) => date !== null, { message: "required" }),
});

export type CommitteeSchemaType = z.infer<typeof CommitteeSchema>;
