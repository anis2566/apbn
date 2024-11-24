"use server";

import { Status } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";
import { TodoSchema, TodoSchemaType } from "./schema";

export const GET_DASHBOARD_DATA = async () => {
  const { scoutCount, unitCount, eventCount, commiteeCount, scouts, todos } =
    await Promise.all([
      db.scout.count(),
      db.unit.count(),
      db.event.count(),
      db.committee.count(),
      db.scout.findMany({
        where: {
          status: Status.Pending,
        },
        include: {
          unit: {
            select: {
              id: true,
            },
          },
        },
        take: 5,
      }),
      db.todo.findMany({
        orderBy: {
          createdAt: "desc",
        },
        take: 5,
      }),
    ]).then(
      ([scoutCount, unitCount, eventCount, commiteeCount, scouts, todos]) => ({
        scoutCount,
        unitCount,
        eventCount,
        commiteeCount,
        scouts,
        todos,
      })
    );

  return {
    scoutCount,
    unitCount,
    eventCount,
    commiteeCount,
    scouts,
    todos,
  };
};

export const CREATE_TODO = async (values: TodoSchemaType) => {
  const { data, success } = TodoSchema.safeParse(values);
  if (!success) {
    throw new Error("Invalid input value");
  }

  await db.todo.create({
    data: {
      ...data,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: "Todo created",
  };
};

export const TOGGLE_TODO = async (id: string) => {
  const todo = await db.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return {
      error: "Todo not found",
    };
  }

  await db.todo.update({
    where: {
      id,
    },
    data: {
      isCompleted: !todo.isCompleted,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: "Todo updated",
  };
};

export const DELETE_TODO = async (id: string) => {
  const todo = await db.todo.findUnique({
    where: {
      id,
    },
  });

  if (!todo) {
    return {
      error: "Todo not found",
    };
  }

  await db.todo.delete({
    where: {
      id,
    },
  });

  revalidatePath("/dashboard");

  return {
    success: "Todo deleted",
  };
};
