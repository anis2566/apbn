"use server";

import { db } from "@/lib/prisma";
import { GalleryMedia } from "@prisma/client";
import { GalleryMediaSchemaType } from "./schema";

type UploadImage = {
  values: GalleryMediaSchemaType;
  galleryId: string;
};

export const UPLOAD_IMAGE = async ({ values, galleryId }: UploadImage) => {
  for (const image of values.images) {
    await db.galleryMedia.create({
      data: {
        ...image,
        galleryId: galleryId,
      },
    });
  }

  return {
    success: "Image uploded",
  };
};
