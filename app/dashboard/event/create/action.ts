"use server";

import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { EventSchema, EventSchemaType } from "./schema";
import { GET_USER } from "@/services/user.service";
import { sendNotification } from "@/services/notification.service";

export const CREATE_EVENT = async (values: EventSchemaType) => {
  const { data, success } = EventSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const newEvent = await db.event.create({
    data: {
      ...data,
      entryFee: data.entryFee ?? 0,
    },
  });

  const scouts = await db.scout.findMany({
    where: {
      status: Status.Active,
    },
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "new-event",
    actor: {
      id: user.id,
    },
    recipients: scouts.map((scout) => scout.userId),
    data: {
      redirectUrl: `/scout/event/${newEvent.id}`,
    },
  });

  revalidatePath("/dashboard/event");

  return {
    success: "Event created",
  };
};
