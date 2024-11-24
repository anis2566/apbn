"use server";

import { AppStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import {
  BanSchema,
  BanSchemaType,
  MigrationSchema,
  MigrationSchemaType,
} from "./schema";
import { GET_ADMIN, GET_USER } from "@/services/user.service";
import { sendNotification } from "@/services/notification.service";

export const APPLY_MIGRATION = async (values: MigrationSchemaType) => {
  const { data, success } = MigrationSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const scout = await db.scout.findUnique({
    where: {
      id: data.scoutId,
    },
    include: {
      unit: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  if (data.unitId === scout.unitId) {
    throw new Error("Migration can not be done in same unit");
  }

  const isApplied = await db.migration.findFirst({
    where: {
      scoutId: data.scoutId,
      status: AppStatus.Pending,
    },
  });

  if (isApplied) {
    throw new Error("Already applied");
  }

  const migrateUnit = await db.unit.findUnique({
    where: {
      id: data.unitId,
    },
  });

  await db.migration.create({
    data: {
      ...data,
    },
  });

  const { user } = await GET_USER();

  const { admin } = await GET_ADMIN();

  await sendNotification({
    trigger: "migration-apply",
    actor: {
      id: user.id,
    },
    recipients: [admin.id],
    data: {
      name: scout.name,
      currentUnit: scout.unit?.name,
      migrateUnit: migrateUnit?.name,
      redirectUrl: `/dashboard/app/migration`,
    },
  });

  revalidatePath("/scout/unit");

  return {
    success: "Applied successfully",
  };
};

export const APPLY_BAN = async (values: BanSchemaType) => {
  const { data, success } = BanSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const scout = await db.scout.findUnique({
    where: {
      id: data.scoutId,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  const isApplied = await db.ban.findFirst({
    where: {
      scoutId: data.scoutId,
      status: AppStatus.Pending,
    },
  });

  if (isApplied) {
    throw new Error("Already applied");
  }

  await db.ban.create({
    data: {
      ...data,
    },
  });

  const { user } = await GET_USER();

  const { admin } = await GET_ADMIN();

  await sendNotification({
    trigger: "ban-apply",
    actor: {
      id: user.id,
    },
    recipients: [admin.id],
    data: {
      name: scout.name,
      redirectUrl: `/dashboard/app/ban`,
    },
  });

  revalidatePath("/scout/unit");

  return {
    success: "Applied successfully",
  };
};
