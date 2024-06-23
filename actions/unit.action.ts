"use server";

import { db } from "@/lib/db";
import { Section, UnitSchema, UnitSchemaType } from "@/schema/unit.schema";
import { revalidatePath } from "next/cache";

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

export const DELETE_UNIT = async (id: string) => {
  const unit = await db.unit.findUnique({
    where: {
      id,
    },
  });
  if (!unit) {
    throw new Error("Unit not found");
  }

  await db.unit.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard/unit");

  return {
    success: "Unit deleted",
  };
};

export const GET_UNITS = async (section: Section | undefined) => {
  const units = await db.unit.findMany({
    where: {
      ...(section && { section: section }),
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(units);

  return {
    units,
  };
};
