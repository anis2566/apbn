"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { AwardSchema, AwardSchemaType } from "./schema";

export const CREATE_AWARD = async (values: AwardSchemaType) => {
  const { data, success } = AwardSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const award = await db.award.findFirst({
    where: {
      title: data.title,
    },
  });
  if (award) {
    throw new Error("Award already exists");
  }

  await db.award.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/award");

  return {
    success: "Award created",
  };
};
