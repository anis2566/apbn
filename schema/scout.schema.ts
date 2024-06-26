import { z } from "zod";

export enum Role {
  Admin = "Admin",
  User = "User",
  Scout = "Scout",
  ScoutLeader = "ScoutLeader"
}

export enum Status {
  Pending = "Pending",
  Active = "Active",
  Verified = "Verified",
  Suspended = "Suspended"
}

export enum Section {
  Cub = "Cub",
  Scout = "Scout",
  Rover = "Rover",
}

export const ScoutSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  apsId: z.string().optional(),
  fatherName: z.string().min(1, { message: "required" }),
  motherName: z.string().min(1, { message: "required" }),
  dob: z.date(),
  gender: z.string().min(1, { message: "required" }),
  phone: z.string().min(11, { message: "required" }),
  religion: z.string().min(1, { message: "required" }),
  email: z.string().optional(),
  bloodGroup: z.string().optional(),
  villageHouse: z.string().min(1, { message: "required" }),
  roadBlockSector: z.string().min(1, { message: "required" }),
  district: z.string().min(1, { message: "required" }),
  division: z.string().min(1, { message: "required" }),
  thana: z.string().min(1, { message: "required" }),
  postCode: z.string().optional(),
  scoutType: z.string().min(1, { message: "required" }),
  experience: z.array(z.string()),
  joinDate: z.date().optional(),
  section: z.string().min(1, { message: "required" }),
  memberType: z.string().min(1, { message: "required" }),
  badge: z.string().optional(),
  role: z.nativeEnum(Role).refine((val) => Object.values(Role).includes(val), {
    message: "required",
  }),
  scoutRegion: z.string().min(1, { message: "required" }),
  scoutDistrict: z.string().min(1, { message: "required" }),
  scoutUpazilla: z.string().optional(),
  institute: z.string().min(1, { message: "required" }),
  class: z.string().min(1, { message: "required" }),
  roll: z.string().min(1, { message: "required" }),
  organization: z.string().optional(),
  designation: z.string().optional(),
  imageUrl: z.string().min(1, { message: "required" }),
  preferedUnit: z.string().min(1, { message: "required" }),
});

export type ScoutSchemaType = z.infer<typeof ScoutSchema>;
