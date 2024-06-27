import { z } from "zod";

export enum PaymentStatus {
  Paid = "Paid",
  Unpaid = "Unpaid",
}

export const EventApplicationSchema = z.object({
  scoutId: z.string().min(1, { message: "required" }),
  eventId: z.string().min(1, { message: "required" }),
});

export type EventApplicationSchemaType = z.infer<typeof EventApplicationSchema>;
