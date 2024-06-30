import { z } from "zod";

export const TodoSchema = z.object({
  title: z.string().min(1, { message: "required" }),
});

export type TodoSchemaType = z.infer<typeof TodoSchema>;
