import { z } from "zod";
import { Section as PrismaSection } from "@prisma/client";

export const ScoutSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  nameBangla: z
    .string()
    .min(1, { message: "required" })
    .regex(/^[\u0980-\u09FF\s]+$/, { message: "must be in Bangla" }),
  apsId: z.string().optional(),
  bsId: z.string().optional(),
  fatherName: z.string().min(1, { message: "required" }),
  fatherNameBangla: z
    .string()
    .min(1, { message: "required" })
    .regex(/^[\u0980-\u09FF\s]+$/, { message: "must be in Bangla" }),
  motherName: z.string().min(1, { message: "required" }),
  motherNameBangla: z
    .string()
    .min(1, { message: "required" })
    .regex(/^[\u0980-\u09FF\s]+$/, { message: "must be in Bangla" }),
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
  courseDateSatrt: z.date().optional(),
  courseDateEnd: z.date().optional(),
  section: z
    .nativeEnum(PrismaSection)
    .refine((val) => Object.values(PrismaSection).includes(val), {
      message: "required",
    }),
  memberType: z.string().min(1, { message: "required" }),
  badge: z.string().optional(),
  role: z.array(z.string()).min(1, { message: "required" }),
  scoutRegion: z.string().min(1, { message: "required" }),
  certificateNo: z.string().optional(),
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

export const EditScoutSchema = z.object({
  name: z.string().min(1, { message: "required" }),
  nameBangla: z
    .string()
    .min(1, { message: "required" })
    .regex(/^[\u0980-\u09FF\s]+$/, { message: "must be in Bangla" }),
  apsId: z.string().optional(),
  fatherName: z.string().min(1, { message: "required" }),
  fatherNameBangla: z
    .string()
    .min(1, { message: "required" })
    .regex(/^[\u0980-\u09FF\s]+$/, { message: "must be in Bangla" }),
  motherName: z.string().min(1, { message: "required" }),
  motherNameBangla: z
    .string()
    .min(1, { message: "required" })
    .regex(/^[\u0980-\u09FF\s]+$/, { message: "must be in Bangla" }),
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
  courseDateSatrt: z.date().optional(),
  courseDateEnd: z.date().optional(),
  section: z
    .nativeEnum(PrismaSection)
    .refine((val) => Object.values(PrismaSection).includes(val), {
      message: "required",
    }),
  memberType: z.string().min(1, { message: "required" }),
  badge: z.string().optional(),
  role: z.array(z.string()).min(1, { message: "required" }),
  scoutRegion: z.string().min(1, { message: "required" }),
  certificateNo: z.string().optional(),
  scoutDistrict: z.string().min(1, { message: "required" }),
  scoutUpazilla: z.string().optional(),
  institute: z.string().min(1, { message: "required" }),
  class: z.string().min(1, { message: "required" }),
  roll: z.string().min(1, { message: "required" }),
  organization: z.string().optional(),
  designation: z.string().optional(),
  imageUrl: z.string().min(1, { message: "required" }),
  preferedUnit: z.string().optional(),
});

export type EditScoutSchemaType = z.infer<typeof EditScoutSchema>;
