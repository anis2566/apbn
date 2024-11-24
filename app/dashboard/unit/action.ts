"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const DELETE_UNIT = async (id: string) => {
  const unit = await db.unit.findUnique({
    where: {
      id,
    },
  });
  if (!unit) {
    throw new Error("Unit not found");
  }

  await db.unit.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/unit");

  return {
    success: "Unit deleted",
  };
};
