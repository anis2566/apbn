"use server";

import { db } from "@/lib/db";
import { extractFileIdFromUrl } from "@/lib/utils";
import { GallerySchema, GallerySchemaType } from "@/schema/gallery.schema";
import { revalidatePath } from "next/cache";
import { UTApi } from "uploadthing/server";

export const CREATE_GALLERY = async (values: GallerySchemaType) => {
  const { data, success } = GallerySchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  await db.gallery.createMany({
    data: data.images.map((item) => ({ imageUrl: item })),
  });

  revalidatePath("/dashboard/gallery");

  return {
    success: "Images uploaded",
  };
};

export const DELETE_GALLERY = async (id: string) => {
  const photo = await db.gallery.findUnique({
    where: {
      id,
    },
  });
  if (!photo) {
    throw new Error("Photo not found");
  }

  const utapi = new UTApi()

  const fileId = extractFileIdFromUrl(photo.imageUrl);

  try {
    const res = await utapi.deleteFiles(fileId);
  } catch (error) {
    console.error("Error deleting file:", error);
  }


  await db.gallery.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/gallery");

  return {
    success: "Images deleted",
  };
};
