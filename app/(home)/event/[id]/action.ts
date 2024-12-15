"use server";

import { db } from "@/lib/prisma";
import { PaymentStatus } from "@prisma/client";

export const SearchTicket = async (phone: string) => {
  const application = await db.campApplication.findFirst({
    where: {
      members: {
        some: {
          phone,
        },
      },
      paymentStatus: PaymentStatus.Paid,
    },
  });

  if (application)
    return {
      appId: application.id,
    };

  return {
    error: "Invalid phone number or unpaid",
  };
};
