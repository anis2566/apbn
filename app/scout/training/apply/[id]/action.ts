"use server";

import { db } from "@/lib/prisma";
import {
  TrainingApplicationSchema,
  TrainingApplicationSchemaType,
} from "./schema";
import { GET_ADMIN, GET_SCOUT } from "@/services/user.service";
import { sendNotification } from "@/services/notification.service";

export const APPLY_TRAINING = async (values: TrainingApplicationSchemaType) => {
  const { data, success } = TrainingApplicationSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid field value");
  }

  const training = await db.training.findUnique({
    where: {
      id: data.trainingId,
    },
  });

  if (!training) {
    throw new Error("Training not found");
  }

  const { scout } = await GET_SCOUT();

  const applied = await db.trainingApplication.findUnique({
    where: {
      id: data.trainingId,
      scoutId: scout.id,
    },
  });

  if (applied) {
    throw new Error("Already applied");
  }

  await db.trainingApplication.create({
    data: {
      ...data,
      scoutId: scout.id,
    },
  });

  const { admin } = await GET_ADMIN();

  await sendNotification({
    trigger: "training-apply",
    actor: {
      id: scout.userId,
      name: scout.name,
    },
    recipients: [admin.id],
    data: {
      training: training.title,
      redirectUrl: `/dashboard/app/training/${training.id}`,
    },
  });

  return {
    success: "Application successful",
  };
};
