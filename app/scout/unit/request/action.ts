"use server";

import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { sendNotification } from "@/services/notification.service";
import { GET_USER } from "@/services/user.service";

type UpdateStatus = {
  id: string;
  status: Status;
};

export const UPDATE_SCOUT_STATUS_LEADER = async ({
  id,
  status,
}: UpdateStatus) => {
  const scout = await db.scout.findUnique({
    where: {
      id,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  await db.scout.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "scout-response-leader",
    actor: {
      id: user.id,
    },
    recipients: [scout.userId],
    data: {
      status,
    },
  });

  revalidatePath("/scout/unit/request");

  return {
    success: "Status updated",
  };
};
