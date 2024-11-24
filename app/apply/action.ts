"use server";

import { Role, Section, Status } from "@prisma/client";

import { db } from "@/lib/prisma";
import { ScoutSchema, ScoutSchemaType } from "./schema";
import { GET_ADMIN, GET_USER } from "@/services/user.service";
import { sendNotification } from "@/services/notification.service";

export const GET_UNITS = async (section: Section) => {
  const units = await db.unit.findMany({
    where: {
      ...(section && { section: section }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    units,
  };
};

export const CREATE_SCOUT = async (values: ScoutSchemaType) => {
  const { success, data } = ScoutSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const scout = await db.scout.findFirst({
    where: {
      OR: [
        {
          phone: values.phone,
        },
        {
          email: values.email,
        },
      ],
    },
  });

  if (scout) {
    throw new Error("Scout already exists");
  }

  const unit = await db.unit.findUnique({
    where: {
      id: data.preferedUnit,
    },
    include: {
      scouts: {
        select: {
          id: true,
        },
      },
      leader: {
        include: {
          user: true,
        },
      },
    },
  });

  if (!unit) {
    throw new Error("Unit not found");
  }

  const isCompletedUnit = unit.limit + 1 === unit.scouts.length;

  if (isCompletedUnit) {
    throw new Error("This unit is full of scout.");
  }

  const { user } = await GET_USER();

  const { preferedUnit, ...rest } = data;

  const newScout = await db.scout.create({
    data: {
      ...rest,
      userId: user.id,
      preferedUnitId: data.preferedUnit,
      preferedUnitName: unit.name,
      email: user.email,
    },
  });

  const updatedUser = await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: Role.Scout,
      status: Status.Pending,
    },
  });

  const { admin } = await GET_ADMIN();
  await sendNotification({
    trigger: "scout-request",
    actor: {
      id: user.id,
      name: newScout.name,
    },
    recipients: [admin.id],
    data: {
      name: newScout.name,
      redirectUrl: `/dashboard/scout/request`,
    },
  });

  if (unit.leaderId) {
    await sendNotification({
      trigger: "scout-request-leader",
      actor: {
        id: user.id,
        name: newScout.name,
      },
      recipients: [unit.leader?.userId || ""],
      data: {
        name: newScout.name,
        redirectUrl: `/scout/unit/request`,
      },
    });
  }

  return {
    success: "Registration successfull",
    user: updatedUser,
    scoutId: newScout.id,
  };
};
