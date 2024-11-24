"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { TrainingSchema, TrainingSchemaType } from "../../create/schema";

type UpdateTraining = {
  id: string;
  values: TrainingSchemaType;
};
export const UPDATE_TRAINING = async ({ id, values }: UpdateTraining) => {
  const { data, success } = TrainingSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid field value");
  }

  const training = await db.training.findUnique({
    where: {
      id,
    },
  });
  if (!training) {
    throw new Error("Training not found");
  }

  await db.training.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/training");

  return {
    success: "Training updated",
  };
};
