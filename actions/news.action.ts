"use server";

import { db } from "@/lib/db";
import { NewsSchema, NewsSchemaType } from "@/schema/news.schema";
import { revalidatePath } from "next/cache";

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

  revalidatePath("/dashboard/news")

  return {
    success: "News created",
  };
};

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
        id
    }
  })
  if(!news) {
    throw new Error("News not found")
  }

  await db.news.update({
    where: {
        id
    }, 
    data: {
        ...data
    }
  })

  revalidatePath("/dashboard/news")

  return {
    success: "News updated"
  }
};


export const DELETE_NEWS = async (id:string) => {
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
            id
        }
    })
    
    revalidatePath("/dashboard/news")

    return {
        success: "News deleted"
    }
}