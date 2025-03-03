"use server";

import { Role, Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { sendNotification } from "@/services/notification.service";
import { GET_USER, IS_ADMIN } from "@/services/user.service";

type UpdateStatus = {
  id: string;
  status: Status;
  suspendReason?: string;
};
export const UPDATE_SCOUT_STATUS = async ({
  id,
  status,
  suspendReason,
}: UpdateStatus) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const scout = await db.scout.findUnique({
    where: {
      id,
    },
    include: {
      unit: true,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  if (status === Status.Active) {
    let apsId = scout.apsId;
    if (!scout.apsId) {
      const counter = await db.counter.findFirst();

      if (!counter) {
        throw new Error("Counter not found");
      }

      apsId = `${new Date().getFullYear().toString().slice(-2)}/${
        (counter?.count ?? 0) + 1
      }`;

      await db.counter.update({
        where: {
          id: counter.id,
        },
        data: {
          count: {
            increment: 1,
          },
        },
      });
    }

    await db.scout.update({
      where: {
        id,
      },
      data: {
        unitId: scout.preferedUnitId,
        preferedUnitId: null,
        preferedUnitName: null,
        apsId,
      },
    });
  } else {
    await db.scout.update({
      where: {
        id,
      },
      data: {
        preferedUnitId: scout.unitId || null,
        preferedUnitName: scout.unit?.name || null,
        suspendReason,
      },
    });
  }

  await db.user.update({
    where: {
      id: scout.userId,
    },
    data: {
      status,
    },
  });

  await db.scout.update({
    where: {
      id,
    },
    data: {
      status,
      suspendReason,
    },
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "scout-response",
    actor: {
      id: user.id,
    },
    recipients: [scout.userId],
    data: {
      status,
    },
  });

  revalidatePath("/dashboard/scout/request");
  revalidatePath("/dashboard/scout");
  revalidatePath("/dashboard/scout/verified");
  revalidatePath("/dashboard/scout/cancelled");
  revalidatePath("/scout/unit/request");

  return {
    success: "Status updated",
  };
};

export const DELETE_SCOUT = async (scoutId: string) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const scout = await db.scout.findUnique({
    where: {
      id: scoutId,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  await db.user.update({
    where: {
      id: scout.userId,
    },
    data: {
      role: Role.User,
    },
  });

  await db.scout.delete({
    where: {
      id: scoutId,
    },
  });

  revalidatePath("/dashboard/scout/request");
  revalidatePath("/dashboard/scout");
  revalidatePath("/dashboard/scout/verified");
  revalidatePath("/dashboard/scout/cancelled");

  return {
    success: "Scout deleted",
  };
};
