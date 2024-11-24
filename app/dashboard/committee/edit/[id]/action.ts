"use server";

import { db } from "@/lib/prisma";
import { CommitteeSchema, CommitteeSchemaType } from "../../create/schema";
import { revalidatePath } from "next/cache";

type UpdateCommittee = {
  id: string;
  values: CommitteeSchemaType;
};

export const UPDATE_COMMITTEE = async ({ id, values }: UpdateCommittee) => {
  const { data, success } = CommitteeSchema.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const committee = await db.committee.findUnique({
    where: {
      id,
    },
  });

  if (!committee) {
    throw new Error("Committee not found");
  }

  await db.committee.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard/committee");

  return {
    success: "Commitee updated",
  };
};
