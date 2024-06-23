import { z } from "zod";

export enum Section {
  Cub = "Cub",
  Scout = "Scout",
  Rover = "Rover",
}

export const UnitSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  section: z
    .nativeEnum(Section)
    .refine((val) => Object.values(Section).includes(val), {
      message: "required",
    }),
  limit: z.number().min(1, {
    message: "required",
  }),
});

export type UnitSchemaType = z.infer<typeof UnitSchema>;
