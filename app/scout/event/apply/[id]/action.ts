"use server";

import { PaymentStatus } from "@prisma/client";

import { db } from "@/lib/prisma";

type EventJoin = {
  id: string;
  eventId: string;
};

export const EVENT_JOIN = async ({ id, eventId }: EventJoin) => {
  const app = await db.eventApplication.findFirst({
    where: {
      eventId,
      scoutId: id,
    },
  });

  if (app) {
    throw new Error("Already applied");
  }

  await db.eventApplication.create({
    data: {
      scoutId: id,
      eventId,
      paymentStatus: PaymentStatus.Paid,
    },
  });

  return {
    success: "Application successful",
  };
};
