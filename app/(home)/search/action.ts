"use server";

import { db } from "@/lib/prisma";
import { Status } from "@prisma/client";

export const GET_SCOUT_BY_APS_ID = async (apsId: string | null) => {
  const scout = await db.scout.findFirst({
    where: {
      apsId,
      status: Status.Active,
    },
  });

  if (!scout) {
    return null;
  }

  return scout;
};
