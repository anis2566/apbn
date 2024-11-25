"use server";

import { db } from "@/lib/prisma";
import { Role } from "@prisma/client";
import { revalidatePath } from "next/cache";
interface UpdateUserRole {
  userId: string;
  role: Role;
}

export const UPDATE_USER_ROLE = async ({ userId, role }: UpdateUserRole) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  await db.user.update({ where: { id: userId }, data: { role } });

  revalidatePath("/dashboard/setting");

  return { success: "User role updated successfully" };
};

export const DELETE_USER = async (userId: string) => {
  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) throw new Error("User not found");

  await db.user.delete({ where: { id: userId } });

  revalidatePath("/dashboard/setting");

  return { success: "User deleted successfully" };
};
