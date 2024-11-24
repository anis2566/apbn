"use server";

import { db } from "@/lib/prisma";
import { CommitteeSchema, CommitteeSchemaType } from "./schema";

export const CREATE_COMMITTEE = async (values: CommitteeSchemaType) => {
  const { data, success } = CommitteeSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const committee = await db.committee.findFirst({
    where: {
      section: data.section,
    },
  });

  if (committee) {
    throw new Error("Commitee already exists");
  }

  await db.committee.create({
    data: {
      ...data,
    },
  });

  return {
    success: "Committee created",
  };
};
