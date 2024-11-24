"use server";

import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const DELETE_NEWS = async (id: string) => {
  const news = await db.news.findUnique({
    where: {
      id,
    },
  });

  if (!news) {
    throw new Error("News not found");
  }

  await db.news.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/news");

  return {
    success: "News deleted",
  };
};
