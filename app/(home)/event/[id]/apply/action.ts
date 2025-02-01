"use server";

import { db } from "@/lib/prisma";
import { CampSchemaType } from "./schema";
import { CampType } from "@prisma/client";

export const apply = async (data: CampSchemaType) => {
  const camp = await db.campApplication.findFirst({
    where: {
      type: data.type,
      eventId: data.eventId,
      members: {
        some: {
          phone: data.members[0].phone,
        },
      },
    },
  });

  // if (camp) {
  //   return {
  //     error: "Application already exists",
  //   };
  // }

    const amount = data.type === CampType.Unit ? (data.members.length * 104) : 104

  const newCamp = await db.campApplication.create({
    data: {
      type: data.type,
      amount: 104,
      unitLeaderName: data.unitLeaderName,
      unitName: data.unitLeaderName,
      unitPhone: data.unitPhone,
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
