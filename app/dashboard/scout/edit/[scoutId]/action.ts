"use server";

import { revalidatePath } from "next/cache";

import { EditScoutSchema, EditScoutSchemaType } from "@/app/apply/schema";
import { db } from "@/lib/prisma";
import { IS_ADMIN } from "@/services/user.service";

type UpdateScout = {
  values: EditScoutSchemaType;
  id: string;
};
export const UPDATE_SCOUT = async ({ values, id }: UpdateScout) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const { success, data } = EditScoutSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const scout = await db.scout.findUnique({
    where: {
      id,
    },
    include: {
      user: true,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  const unit = await db.unit.findUnique({
    where: {
      id: data.preferedUnit,
    },
  });

  const { preferedUnit, ...rest } = data;

  await db.scout.update({
    where: {
      id,
    },
    data: {
      ...rest,
      preferedUnitId: preferedUnit,
      preferedUnitName: unit?.name,
    },
  });

  revalidatePath(`/dashboard/scout/${id}`);

  return {
    success: "Scout updated",
  };
};
