"use server";

import { revalidatePath } from "next/cache";

import { NoticeSchema, NoticeSchemaType } from "./schema";
import { db } from "@/lib/prisma";

export const CREATE_NOTICE = async (values: NoticeSchemaType) => {
  const { data, success } = NoticeSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const notice = await db.notice.count()

  if(notice > 0) {
    throw new Error("Already have a notice, update it")
  }

  await db.notice.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/notice");

  return {
    success: "Notice created",
  };
};
