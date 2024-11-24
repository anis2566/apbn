import { z } from "zod";

export const MessageSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  email: z.string().email({ message: "Invalid email" }),
  message: z.string().min(5, { message: "required" }),
});

export type MessageSchemaType = z.infer<typeof MessageSchema>;
