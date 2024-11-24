"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

export const DELETE_EVENT = async (id: string) => {
  const event = await db.event.findUnique({
    where: {
      id,
    },
  });
  if (!event) {
    throw new Error("Event not found");
  }

  await db.event.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/event");

  return {
    success: "Event deleted",
  };
};
