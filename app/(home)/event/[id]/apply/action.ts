"use server";

import { db } from "@/lib/prisma";
import { CampSchemaType } from "./schema";
import { CampType } from "@prisma/client";

export const apply = async (data: CampSchemaType) => {
  const camp = await db.campApplication.findFirst({
    where: {
      type: data.type,
      members: {
        some: {
          phone: data.members[0].phone,
        },
      },
    },
  });

  if (camp) {
    return {
      error: "Application already exists",
    };
  }

  const newCamp = await db.campApplication.create({
    data: {
      type: data.type,
      amount: data.type === CampType.Individual ? 1470 : 10600,
      eventId: data.eventId,
      members: {
        create: data.members.map((member) => ({
          name: member.name,
          class: member.class,
          role: member.role,
          section: member.section,
          phone: member.phone,
        })),
      },
    },
  });

  return {
    success: "Application submitted.",
    id: newCamp.id,
  };
};
