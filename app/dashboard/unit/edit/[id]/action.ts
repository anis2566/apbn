"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { UnitSchemaType } from "../../schema";

type UpdateUnit = {
  unit: UnitSchemaType;
  unitId: string;
};

export const UPDATE_UNIT = async ({ unit, unitId }: UpdateUnit) => {
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
