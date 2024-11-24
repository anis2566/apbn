"use server";

import { AppStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { sendNotification } from "@/services/notification.service";
import { GET_USER } from "@/services/user.service";

type UpdateStatus = {
  id: string;
  status: AppStatus;
};

export const UPDATE_STATUS = async ({ id, status }: UpdateStatus) => {
  const app = await db.trainingApplication.findUnique({
    where: {
      id,
    },
    include: {
      scout: true,
      training: true,
    },
  });

  if (!app) {
    throw new Error("Application not found");
  }

  await db.trainingApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "training-response",
    actor: {
      id: user.id,
    },
    recipients: [app?.scout?.userId ?? ""],
    data: {
      training: app?.training?.title,
      status,
    },
  });

  revalidatePath(`/dashboard/app/training/${app.trainingId}`);

  return {
    success: "Stuatus updated",
  };
};

export const DELETE_APPLICATION = async (id: string) => {
  const app = await db.trainingApplication.findUnique({
    where: {
      id,
    },
  });
  if (!app) {
    throw new Error("Application not found");
  }

  await db.trainingApplication.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/dashboard/app/training/${app.trainingId}`);

  return {
    success: "Application deleted",
  };
};
