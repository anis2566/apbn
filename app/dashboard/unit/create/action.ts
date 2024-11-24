"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { UnitSchema, UnitSchemaType } from "../schema";

export const CREATE_UNIT = async (values: UnitSchemaType) => {
  const { success, data } = UnitSchema.safeParse(values);

  if (!success) {
    throw new Error(`Invalid input value`);
  }

  const existingUnit = await db.unit.findFirst({
    where: {
      name: data.name,
      section: data.section,
    },
  });

  if (existingUnit) {
    throw new Error("Unit already exists");
  }

  await db.unit.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/unit");

  return {
    success: "Unit created",
  };
};
