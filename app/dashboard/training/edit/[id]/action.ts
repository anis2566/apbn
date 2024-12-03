"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { TrainingSchema, TrainingSchemaType } from "../../create/schema";
import { IS_ADMIN } from "@/services/user.service";

type UpdateTraining = {
  id: string;
  values: TrainingSchemaType;
};
export const UPDATE_TRAINING = async ({ id, values }: UpdateTraining) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }
  
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
