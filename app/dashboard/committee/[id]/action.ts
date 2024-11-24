"use server";

import { db } from "@/lib/prisma";
import { CommitteeMember, CommitteeMemberType } from "./schema";
import { revalidatePath } from "next/cache";

type AddMember = {
  committeeId: string;
  values: CommitteeMemberType
}

export const ADD_MEMBER = async ({values, committeeId}: AddMember) => {
  const { data, success } = CommitteeMember.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const member = await db.committeeMember.findFirst({
    where: {
      name: data.name,
    },
  });

  if (member) {
    throw new Error("Member already exists");
  }

  await db.committeeMember.create({
    data: {
      ...data,
      committeeId
    },
  });

  revalidatePath("/dashboard/committee");

  return {
    success: "Member added",
  };
};

type UpdateMember = {
  id: string;
  values: CommitteeMemberType;
};

export const UPDATE_MEMBER = async ({ id, values }: UpdateMember) => {
  const { data, success } = CommitteeMember.safeParse(values);

  if (!success) {
    throw new Error("Invalid input value");
  }

  const member = await db.committeeMember.findUnique({
    where: {
      id,
    },
  });

  if (!member) {
    throw new Error("Member not found");
  }

  await db.committeeMember.update({
    where: {
      id,
    },
    data: {
      ...data,
    },
  });

  revalidatePath(`/dashboard/committee/${member.committeeId}`);

  return {
    success: "Member updated",
  };
};

export const DELETE_MEMBER = async (id: string) => {
  const member = await db.committeeMember.findUnique({
    where: {
      id,
    },
  });

  if (!member) {
    throw new Error("Member not found");
  }

  await db.committeeMember.delete({
    where: {
      id,
    },
  });

  revalidatePath(`/dashboard/committee/${member.committeeId}`);

  return {
    success: "Member deleted",
  };
};
