"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { AwardSchema, AwardSchemaType } from "../../create/schema";
import { IS_ADMIN } from "@/services/user.service";

type UpdateAward = {
  awardId: string;
  values: AwardSchemaType;
};
export const UPDATE_AWARD = async ({ values, awardId }: UpdateAward) => {
  const isAdmin = await IS_ADMIN();

  if (!isAdmin) {
    throw new Error("Unauthorized");
  }

  const { data, success } = AwardSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  const award = await db.award.findUnique({
    where: {
      id: awardId,
    },
  });

  if (!award) {
    throw new Error("Award not found");
  }

  await db.award.update({
    where: {
      id: awardId,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/award");

  return {
    success: "Award updated",
  };
};
