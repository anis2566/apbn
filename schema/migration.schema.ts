import { z } from "zod";

export enum MigrationStatus {
  Pending = "Pending",
  Approved = "Approved",
  Rejected = "Rejected",
}


export const MigrationSchema = z.object({
  scoutId: z.string().min(1, { message: "required" }),
  unitId: z.string().min(1, { message: "required" }),
  reason: z.string().min(15, { message: "required" }),
});

export type MigrationSchemaType = z.infer<typeof MigrationSchema>;
