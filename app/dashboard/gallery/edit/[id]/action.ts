"use server";

import { db } from "@/lib/prisma";
import { GallerySchema, GallerySchemaType } from "../../create/schema";
import { revalidatePath } from "next/cache";

type UpdateGallery = {
  id: string;
  values: GallerySchemaType;
};

export const UPDATE_GALLERY = async ({ id, values }: UpdateGallery) => {
  const { data, success } = GallerySchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const gallery = await db.gallery.findUnique({
    where: {
      id,
    },
  });

  if (!gallery) {
    throw new Error("Gallery not found");
  }

  await db.gallery.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/gallery")

  return {
    success: "Gallery updated",
  };
};
