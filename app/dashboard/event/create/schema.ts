import { z } from "zod";

export const EventSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  description: z.string().min(1, { message: "required" }),
  venue: z.string().min(1, { message: "required" }),
  imageUrl: z.string().min(1, { message: "required" }),
  entryFee: z.number().optional(),
  eventStart: z.date().refine((date) => date !== null, { message: "required" }),
  eventEnd: z.date().refine((date) => date !== null, { message: "required" }),
  registrationStart: z
    .date()
    .refine((date) => date !== null, { message: "required" }),
  registrationEnd: z
    .date()
    .refine((date) => date !== null, { message: "required" }),
});

export type EventSchemaType = z.infer<typeof EventSchema>;
