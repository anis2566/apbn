"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const DELETE_COMMITEE = async (id: string) => {
  const commite = await db.committee.findUnique({
    where: {
      id,
    },
  });
  if (!commite) {
    throw new Error("Commitee not found");
  }

  await db.committee.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/dashboard/commitee`);

  return {
    success: "Commitee deleted",
  };
};
