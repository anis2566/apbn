"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DELETE_GALLERY_MEDIA = async (id: string) => {
  const galleryMedia = await db.galleryMedia.findUnique({
    where: {
      id,
    },
  });

  if (!galleryMedia) {
    throw new Error("Image not found");
  }

  await db.galleryMedia.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/dashboard/gallery/${galleryMedia.galleryId}`);

  return {
    success: "Image deleted",
  };
};
