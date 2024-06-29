import { z } from "zod";

export enum TrainingType {
  National = "National",
  Region = "Region",
  District = "District",
}

export const TrainingSchema = z.object({
  title: z.string().min(1, { message: "required" }),
  description: z.string().min(1, { message: "required" }),
  venue: z.string().min(1, { message: "required" }),
  imageUrl: z.string().min(1, { message: "required" }),
  limit: z.number().min(1, { message: "required" }),
  type: z
    .nativeEnum(TrainingType)
    .refine((val) => Object.values(TrainingType).includes(val), {
      message: "required",
    }),
  trainingStart: z
    .date()
    .refine((date) => date !== null, { message: "required" }),
  trainingEnd: z
    .date()
    .refine((date) => date !== null, { message: "required" }),
});

export type TrainingSchemaType = z.infer<typeof TrainingSchema>;
