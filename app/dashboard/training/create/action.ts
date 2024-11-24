"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { TrainingSchema, TrainingSchemaType } from "./schema";

export const CREATE_TRAINING = async (values: TrainingSchemaType) => {
  const { data, success } = TrainingSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid field value");
  }

  await db.training.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/training");

  return {
    success: "Training created",
  };
};
