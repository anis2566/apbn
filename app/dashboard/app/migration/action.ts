"use server";

import { db } from "@/lib/prisma";
import { sendNotification } from "@/services/notification.service";
import { GET_USER } from "@/services/user.service";
import { AppStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

type MigrationStatusType = {
  migrationId: string;
  status: AppStatus;
};
export const UPDATE_MIGRATION_STATUS = async ({
  migrationId,
  status,
}: MigrationStatusType) => {
  const migration = await db.migration.findUnique({
    where: {
      id: migrationId,
    },
    include: {
      unit: {
        include: {
          leader: true,
        },
      },
      scout: {
        include: {
          unit: true,
        },
      },
    },
  });

  if (!migration) {
    throw new Error("Migration not found");
  }

  if (status === AppStatus.Approved) {
    if (migration.scoutId) {
      await db.scout.update({
        where: {
          id: migration.scoutId,
        },
        data: {
          unitId: migration.unitId,
        },
      });
    }
  }

  await db.migration.update({
    where: {
      id: migrationId,
    },
    data: {
      status,
    },
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "migration-response",
    actor: {
      id: user.id,
    },
    recipients: [migration.scout?.userId || ""],
    data: {
      name: migration?.scout?.name,
      status,
    },
  });

  if (migration.unit?.leader?.userId) {
    await sendNotification({
      trigger: "migration-response-leader",
      actor: {
        id: user.id,
      },
      recipients: [migration.unit.leader.userId || ""],
      data: {
        name: migration?.scout?.name,
        status,
      },
    });
  }

  revalidatePath("/dashboard/app/migration");

  return {
    success: "Status updated",
  };
};

export const DELETE_MIGRATION = async (id: string) => {
  const migration = await db.migration.findUnique({
    where: {
      id,
    },
  });
  if (!migration) {
    throw new Error("Migration not found");
  }

  await db.migration.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/app/migration");

  return {
    success: "Application deleted",
  };
};
