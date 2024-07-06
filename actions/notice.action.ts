"use server";

import { db } from "@/lib/db";
import { NoticeSchema, NoticeSchemaType } from "@/schema/notice.schema";
import { CouponStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const CREATE_NOTICE = async (values: NoticeSchemaType) => {
  const { data, success } = NoticeSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  await db.notice.create({
    data: {
      ...data
    }
  })

  revalidatePath("/dashboard/notice");

  return {
    success: "Notice created",
  };
};


export const TOGGLE_STATUS = async (id: string) => {
  const notice = await db.notice.findUnique({
    where: {
      id
    }
  })
  if(!notice) {
    throw new Error("Notice not found")
  }

  await db.notice.update({
    where: {
      id
    },
    data: {
      status: notice.status === CouponStatus.Active ? CouponStatus.Inactive : CouponStatus.Active
    }
  })

  revalidatePath("/dashboard/notice");

  return {
    success: "Status updated",
  };
}

export const DELETE_NOTICE = async (id: string) => {
  const notice = await db.notice.findUnique({
    where: {
      id
    }
  })
  if(!notice) {
    throw new Error("Notice not found")
  }

  await db.notice.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/notice");

  return {
    success: "Notice deleted",
  };
};
