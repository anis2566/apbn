import { CampType, Section } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const ApplyMemberSchema = z.object({
  name: requiredString,
  class: requiredString,
  role: requiredString,
  section: z
    .nativeEnum(Section)
    .refine((val) => Object.values(Section).includes(val), {
      message: "required",
    }),
  phone: requiredString.length(11, {
    message: "Phone number must be 10 digits",
  }),
});

export const CampSchema = z.object({
  type: z
    .nativeEnum(CampType)
    .refine((val) => Object.values(CampType).includes(val), {
      message: "required",
    }),
  amount: z.number().min(1),
  unitName: requiredString,
  unitLeaderName: requiredString,
  unitPhone: requiredString.length(11, {message: "invalid phone number"}),
  members: z.array(ApplyMemberSchema),
  eventId: requiredString,
});

export type CampSchemaType = z.infer<typeof CampSchema>;
