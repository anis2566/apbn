"use server";

import { db } from "@/lib/db";
import { Status } from "@/schema/scout.schema";

export const GET_DASHBOARD_DATA = async () => {
  const { scoutCount, unitCount, eventCount, commiteeCount, scouts, todos } =
    await Promise.all([
      db.scout.count(),
      db.unit.count(),
      db.event.count(),
      db.commitee.count(),
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
        scoutCount, unitCount, eventCount, commiteeCount, scouts, todos  
    }
};
