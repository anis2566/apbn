"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { IS_ADMIN } from "@/services/user.service";

export const DELETE_AWARD = async (id: string) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  } 
  const award = await db.award.findUnique({
    where: {
      id,
    },
  });
  if (!award) {
    throw new Error("Award not found");
  }

  await db.award.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/scout/award");

  return {
    success: "Award deleted",
  };
};
