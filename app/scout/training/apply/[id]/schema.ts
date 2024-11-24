import { z } from "zod";

export const TrainingApplicationSchema = z.object({
  trainingId: z.string().min(1, { message: "required" }),
  attachments: z.array(z.string()).min(1, { message: "required" }),
});

export type TrainingApplicationSchemaType = z.infer<
  typeof TrainingApplicationSchema
>;
