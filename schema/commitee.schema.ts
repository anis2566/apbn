import { z } from "zod";

export enum CommiteeSection {
  PackCouncil = "PackCouncil",
  TroopCouncil = "TroopCouncil",
  CrewCouncil = "CrewCouncil",
  GroupCommitee = "GroupCommitee",
}

export const CommiteeSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  designation: z.string().min(1, { message: "required" }),
  imageUrl: z.string().min(1, { message: "required" }),
  section: z
    .nativeEnum(CommiteeSection)
    .refine((val) => Object.values(CommiteeSection).includes(val), {
      message: "required",
    }),
});

export type CommiteeSchemaType = z.infer<typeof CommiteeSchema>;
