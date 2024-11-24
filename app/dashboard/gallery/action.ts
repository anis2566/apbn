"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DELETE_GALLERY = async (id: string) => {
  const gallery = await db.gallery.findUnique({
    where: {
      id,
    },
  });

  if (!gallery) {
    throw new Error("Gallery not found");
  }

  await db.gallery.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/gallery");

  return {
    success: "Gallery deleted",
  };
};
