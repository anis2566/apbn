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

export const UPDATE_APPLICATION_STATUS = async ({
  id,
  status,
}: UpdateStatus) => {
  const app = await db.eventApplication.findUnique({
    where: {
      id,
    },
    include: {
      event: true,
      scout: true,
    },
  });

  if (!app) {
    throw new Error("Application not found");
  }

  await db.eventApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "event-application-response",
    actor: {
      id: user.id,
    },
    recipients: [app.scout?.userId || ""],
    data: {
      event: app.event?.title,
      status,
    },
  });

  revalidatePath(`/dashboard/app/event/${app.eventId}`);

  return {
    success: "Status updated",
  };
};

export const DELETE_APPLICATION = async (id: string) => {
  const app = await db.eventApplication.findUnique({
    where: {
      id,
    },
  });
  
  if (!app) {
    throw new Error("Application not found");
  }

  await db.eventApplication.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/dashboard/app/event/${app.eventId}`);

  return {
    success: "Application deleted",
  };
};
