"use server";

import { auth } from "@/auth";
import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { redirect } from "next/navigation";

export const GET_USER_BY_EMAIL = async (email: string) => {
  const user = await db.user.findUnique({
    where: {
      email,
    },
  });
  if (!user) {
    throw new Error("User not found");
  }

  return user;
};

export const GET_USER = async () => {
  const session = await auth();

  if (!session?.userId) {
    redirect("/auth/sign-in");
  }

  const user = await db.user.findUnique({
    where: {
      id: session?.userId,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return { user };
};

export const GET_ADMIN = async () => {
  const admin = await db.user.findFirst({
    where: {
      role: Role.Admin,
    },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  return { admin };
};

export const GET_SCOUT = async () => {
  const session = await auth();

  if (!session?.userId) {
    redirect("/auth/sign-in");
  }

  const scout = await db.scout.findFirst({
    where: {
      userId: session.userId
    },
    include: {
      unit: true,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  return {
    scout,
  };
};
