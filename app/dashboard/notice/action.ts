"use server";

import { db } from "@/lib/prisma";
import { NoticeStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const DELETE_NOTICE = async (id: string) => {
  const notice = await db.notice.findUnique({
    where: {
      id,
    },
  });

  if (!notice) {
    throw new Error("Notice not found");
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

export const TOGGLE_STATUS = async (id: string) => {
  const notice = await db.notice.findUnique({
    where: {
      id,
    },
  });

  if (!notice) {
    throw new Error("Notice not found");
  }

  await db.notice.update({
    where: {
      id,
    },
    data: {
      status:
        notice.status === NoticeStatus.Active
          ? NoticeStatus.Inactive
          : NoticeStatus.Active,
    },
  });

  revalidatePath("/dashboard/notice");

  return {
    success: "Status updated",
  };
};
