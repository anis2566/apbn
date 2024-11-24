"use server";

import { db } from "@/lib/prisma";
import { NewsSchema, NewsSchemaType } from "../../create/schema";
import { revalidatePath } from "next/cache";

type UpdateNews = {
  id: string;
  values: NewsSchemaType;
};

export const UPDATE_NEWS = async ({ values, id }: UpdateNews) => {
  const { data, success } = NewsSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const news = await db.news.findUnique({
    where: {
      id,
    },
  });

  if (!news) {
    throw new Error("News not found");
  }

  await db.news.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/news");

  return {
    success: "News updated",
  };
};
