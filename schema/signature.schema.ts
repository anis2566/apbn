import { z } from "zod";

export enum SignatureAuthor {
  MD = "MD",
  Manager = "Manager",
  Accountant = "Accountant",
}

export const SignatureSchema = z.object({
  imageUrl: z.string().min(1, { message: "required" }),
  author: z
    .nativeEnum(SignatureAuthor)
    .refine((val) => Object.values(SignatureAuthor).includes(val), {
      message: "required",
    }),
});

export type SignatureSchemaType = z.infer<typeof SignatureSchema>;
