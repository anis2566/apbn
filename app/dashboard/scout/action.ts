"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { sendNotification } from "@/services/notification.service";
import { GET_USER } from "@/services/user.service";

type CardStatus = {
  scoutId: string;
  status: boolean;
};
export const UPDATE_SCOUT_CARD_STATUS = async ({
  scoutId,
  status,
}: CardStatus) => {
  const scout = await db.scout.findUnique({
    where: {
      id: scoutId,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  await db.scout.update({
    where: {
      id: scoutId,
    },
    data: {
      allowCard: status,
    },
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "scout-card",
    actor: {
      id: user.id,
    },
    recipients: [scout.userId],
    data: {
      status: status ? "Approved" : "Rejected",
    },
  });

  revalidatePath("/dashboard/scout");

  return {
    success: "Status updated",
  };
};

export const GET_AWARDS = async (title: string) => {
  const awards = await db.award.findMany({
    where: {
      ...(title && { title: { contains: title, mode: "insensitive" } }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { awards };
};

type AssignAward = {
  scoutId: string;
  awardId: string;
};

export const ASSIGN_AWARD = async ({ scoutId, awardId }: AssignAward) => {
  const isAwarded = await db.scoutAward.findUnique({
    where: {
      scoutId_awardId: {
        awardId,
        scoutId,
      },
    },
  });

  if (isAwarded) {
    throw new Error("Already have this award");
  }

  await db.scoutAward.create({
    data: {
      scoutId,
      awardId,
    },
  });

  revalidatePath("/dashboard/scout");

  return {
    success: "Award assigned",
  };
};
