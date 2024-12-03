"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { IS_ADMIN } from "@/services/user.service";

export const DELETE_COMMITEE = async (id: string) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

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
