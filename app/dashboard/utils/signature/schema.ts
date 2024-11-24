import { SignatureAuthor } from "@prisma/client";
import { z } from "zod";

export const SignatureSchema = z.object({
  imageUrl: z.string().min(1, { message: "required" }),
  author: z
    .nativeEnum(SignatureAuthor)
    .refine((val) => Object.values(SignatureAuthor).includes(val), {
      message: "required",
    }),
});

export type SignatureSchemaType = z.infer<typeof SignatureSchema>;
