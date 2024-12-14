"use server";

import { AppStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

type UpdateStatus = {
  id: string;
  status: AppStatus;
};

export const UPDATE_APPLICATION_STATUS = async ({
  id,
  status,
}: UpdateStatus) => {
  const app = await db.campApplication.findUnique({
    where: {
      id,
    },
    include: {
      event: true,
    },
  });

  if (!app) {
    throw new Error("Application not found");
  }

  await db.campApplication.update({
    where: {
      id,
    },
    data: {
      status,
    },
  });

  revalidatePath(`/dashboard/app/event/${app.eventId}`);

  return {
    success: "Status updated",
  };
};

export const DELETE_APPLICATION = async (id: string) => {
  const app = await db.campApplication.findUnique({
    where: {
      id,
    },
  });

  if (!app) {
    throw new Error("Application not found");
  }

  await db.campApplication.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/dashboard/app/event/${app.eventId}`);

  return {
    success: "Application deleted",
  };
};
