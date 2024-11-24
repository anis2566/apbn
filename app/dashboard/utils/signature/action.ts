"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { SignatureSchema, SignatureSchemaType } from "./schema";

export const CREATE_SIGNATURE = async (values: SignatureSchemaType) => {
  const { data, success } = SignatureSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input type");
  }

  const signature = await db.signature.findFirst({
    where: {
      author: data.author,
    },
  });
  if (signature) {
    throw new Error("Signature already exists");
  }

  await db.signature.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/utils/signature");

  return {
    success: "Signature created",
  };
};

type UpdateSignature = {
  id: string;
  values: SignatureSchemaType;
};
export const UPDATE_SIGNATURE = async ({ id, values }: UpdateSignature) => {
  const { data, success } = SignatureSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input type");
  }

  const signature = await db.signature.findUnique({
    where: {
      id,
    },
  });
  
  if (!signature) {
    throw new Error("Signature not found");
  }

  await db.signature.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/utils/signature");

  return {
    success: "Signature updated",
  };
};

export const DELETE_SIGNATURE = async (id: string) => {
  const signature = await db.signature.findUnique({
    where: {
      id,
    },
  });
  if (!signature) {
    throw new Error("Signature not found");
  }

  await db.signature.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/utils/signature");

  return {
    success: "Signature deleted",
  };
};
