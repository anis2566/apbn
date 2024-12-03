"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { IS_ADMIN } from "@/services/user.service";

export const DELETE_EVENT = async (id: string) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

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
