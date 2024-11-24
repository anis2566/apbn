"use server";

import { db } from "@/lib/prisma";
import { sendNotification } from "@/services/notification.service";
import { GET_USER } from "@/services/user.service";
import { Role, Section, Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const GET_SCOUTS_BY_NAME = async (name: string) => {
  const scouts = await db.scout.findMany({
    where: {
      status: Status.Active,
      ...(name && { name: { contains: name, mode: "insensitive" } }),
    },
    select: {
      name: true,
      apsId: true,
      imageUrl: true,
      id: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
  });

  return { scouts };
};

type AssigLeader = {
  unitId: string;
  leaderId: string;
};
export const ASSIGN_LEADER = async ({ unitId, leaderId }: AssigLeader) => {
  const unit = await db.unit.findUnique({
    where: {
      id: unitId,
    },
  });

  if (!unit) {
    throw new Error("Unit not found");
  }

  const scout = await db.scout.findUnique({
    where: {
      id: leaderId,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  await db.$transaction(async (ctx) => {
    await ctx.unit.update({
      where: {
        id: unitId,
      },
      data: {
        leaderId,
      },
    });

    await ctx.scout.update({
      where: {
        id: leaderId,
      },
      data: {
        role: ["scout", "unitLeader"],
      },
    });

    await ctx.user.update({
      where: {
        id: scout.userId,
      },
      data: {
        role: Role.ScoutLeader,
      },
    });
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "scout-leader-assign",
    actor: {
      id: user.id,
    },
    recipients: [scout.userId],
    data: {
      unit: unit.name,
    },
  });

  revalidatePath(`/dashboard/unit/${unitId}`);

  return {
    success: "Leader assigned",
  };
};

export const REMOVE_LEADER = async (unitId: string) => {
  const unit = await db.unit.findUnique({
    where: {
      id: unitId,
    },
    include: {
      leader: true,
    },
  });

  if (!unit || !unit.leader) {
    throw new Error("Unit not found");
  }

  await db.$transaction(async (ctx) => {
    await ctx.scout.update({
      where: {
        id: unit.leader?.id,
      },
      data: {
        role: ["scout"],
      },
    });

    await ctx.user.update({
      where: {
        id: unit.leader?.userId,
      },
      data: {
        role: Role.Scout,
      },
    });

    await ctx.unit.update({
      where: {
        id: unitId,
      },
      data: {
        leaderId: null,
      },
    });
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "scout-leader-remove",
    actor: {
      id: user.id,
    },
    recipients: [unit.leader.userId],
    data: {
      unit: unit.name,
    },
  });

  revalidatePath(`/dashboard/unit/${unitId}`);

  return {
    success: "Leader removed",
  };
};

type RemoveScout = {
  scoutId: string;
  unitId: string;
};
export const REMOVE_SCOUT = async ({ scoutId, unitId }: RemoveScout) => {
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
      unitId: null,
    },
  });

  revalidatePath(`/dashboard/unit/${unitId}`);

  return {
    success: "Scout removed",
  };
};

export const GET_UNITS_BY_SECTION = async (section: Section) => {
  const units = await db.unit.findMany({
    where: {
      section: section,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { units };
};

type MigrateScout = {
  scoutId: string;
  unitId: string;
};
export const MIGRATE_SCOUT = async ({ scoutId, unitId }: MigrateScout) => {
  const scout = await db.scout.findUnique({
    where: {
      id: scoutId,
    },
    include: {
      unit: true,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  const unit = await db.unit.findUnique({
    where: {
      id: unitId,
    },
  });

  if (!unit) {
    throw new Error("Unit not found");
  }

  if(scout.unitId === unitId) {
    throw new Error("Migration can not be done on same unit")
  }

  await db.scout.update({
    where: {
      id: scoutId,
    },
    data: {
      unitId,
    },
  });

  const { user } = await GET_USER();

  await sendNotification({
    trigger: "migrate-scout",
    actor: {
      id: user.id,
    },
    recipients: [scout.userId],
    data: {
      currentUnit: scout.unit?.name,
      migrateUnit: unit.name,
    },
  });

  revalidatePath(`/dashboard/unit/${unitId}`);

  return {
    success: "Migration successful",
  };
};
