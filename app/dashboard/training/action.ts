"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { IS_ADMIN } from "@/services/user.service";

export const DELETE_TRAINING = async (id: string) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const training = await db.training.findUnique({
    where: {
      id,
    },
  });
  if (!training) {
    throw new Error("Training not found");
  }

  await db.training.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/training");

  return {
    success: "Training deleted",
  };
};
