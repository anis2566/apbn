"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { EventSchema, EventSchemaType } from "../../create/schema";

type UpdateEvent = {
  id: string;
  values: EventSchemaType;
};
export const UPDATE_EVENT = async ({ id, values }: UpdateEvent) => {
  const { data, success } = EventSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const event = await db.event.findUnique({
    where: {
      id,
    },
  });
  if (!event) {
    throw new Error("Event not found");
  }

  await db.event.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/event")

  return {
    success: "Event updated",
  };
};
