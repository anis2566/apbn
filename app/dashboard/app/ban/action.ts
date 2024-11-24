"use server";

import { db } from "@/lib/prisma";
import { sendNotification } from "@/services/notification.service";
import { GET_USER } from "@/services/user.service";
import { AppStatus, Role } from "@prisma/client";
import { revalidatePath } from "next/cache";

type UpdateStatus = {
  banId: string;
  status: AppStatus;
};

export const UPDATE_BAN_STATUS = async ({ banId, status }: UpdateStatus) => {
  const ban = await db.ban.findUnique({
    where: {
      id: banId,
    },
    include: {
      scout: {
        include: {
          unit: {
            include: {
              leader: true,
            },
          },
        },
      },
    },
  });

  if (!ban) {
    throw new Error("Ban app not found");
  }

  if (status === AppStatus.Approved) {
    if (ban.scoutId) {
      await db.user.update({
        where: {
          id: ban.scoutId,
        },
        data: {
          role: Role.User,
        },
      });

      await db.scout.delete({
        where: {
          id: ban.scoutId,
        },
      });
    }
  }

  await db.ban.update({
    where: {
      id: banId,
    },
    data: {
      status,
    },
  });

  const { user } = await GET_USER();

  if (ban.scout?.unit?.leader?.userId) {
    await sendNotification({
      trigger: "ban-response",
      actor: {
        id: user.id,
      },
      recipients: [ban.scout.unit.leader.userId],
      data: {
        name: ban.scout?.name,
        status,
      },
    });
  }

  revalidatePath("/dashboard/app/ban");

  return {
    success: "Status updated",
  };
};

export const DELETE_BAN = async (banId: string) => {
  const ban = await db.ban.findUnique({
    where: {
      id: banId,
    },
  });
  if (!ban) {
    throw new Error("Ban app not found");
  }

  await db.ban.delete({
    where: {
      id: banId,
    },
  });

  revalidatePath("/dashboard/app/ban");

  return {
    success: "Ban application deleted",
  };
};
