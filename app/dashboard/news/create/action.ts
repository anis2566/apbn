"use server";

import { revalidatePath } from "next/cache";

import { NewsSchema, NewsSchemaType } from "./schema";
import { db } from "@/lib/prisma";

export const CREATE_NEWS = async (values: NewsSchemaType) => {
  const { data, success } = NewsSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  await db.news.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/news");

  return {
    success: "News created",
  };
};
