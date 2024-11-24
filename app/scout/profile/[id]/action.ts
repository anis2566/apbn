"use server";

import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

type Values = {
  villageHouse: string;
  roadBlockSector: string;
  district: string;
  division: string;
  thana: string;
  postCode?: string;
};

type UpdateScout = {
  values: Values;
  id: string;
};
export const UPDATE_SCOUT = async ({ values, id }: UpdateScout) => {
  const scout = await db.scout.findUnique({
    where: {
      id,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  await db.scout.update({
    where: {
      id,
    },
    data: {
      ...values,
    },
  });

  revalidatePath(`/scout/profile`);

  return {
    success: "Profile updated",
  };
};
