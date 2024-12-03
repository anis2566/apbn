"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { UnitSchemaType } from "../../schema";
import { GET_ADMIN, IS_ADMIN } from "@/services/user.service";

type UpdateUnit = {
  unit: UnitSchemaType;
  unitId: string;
};

export const UPDATE_UNIT = async ({ unit, unitId }: UpdateUnit) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const isExistUnit = await db.unit.findUnique({
    where: {
      id: unitId,
    },
  });
  if (!isExistUnit) {
    throw new Error("Unit not found");
  }

  await db.unit.update({
    where: {
      id: unitId,
    },
    data: {
      ...unit,
    },
  });

  revalidatePath(`/dashboard/unit/edit/${unitId}`);

  return {
    success: "Unit updated",
  };
};
