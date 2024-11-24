"use server";

import { db } from "@/lib/prisma";
import { CouponStatus } from "@prisma/client";

export const GET_SCOUT = async (scoutId: string) => {
  const scout = await db.scout.findUnique({
    where: {
      id: scoutId,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  return { scout };
};

export const GET_FEE_BY_TITLE = async (title: string) => {
  const fee = await db.fee.findFirst({
    where: {
      title,
    },
  });

  if (!fee) {
    throw new Error("Fee not found");
  }

  return {
    fee,
  };
};

export const APPLY_COUPON = async (code: string) => {
  const coupon = await db.coupon.findFirst({
    where: {
      code,
      expire: {
        gte: new Date(),
      },
      status: CouponStatus.Active,
    },
  });

  if (!coupon) {
    throw new Error("Invalid coupon or expired");
  }

  return {
    value: coupon.value,
  };
};

export const CONFIRM_PAYMENT = async (id: string) => {
  const scout = await db.scout.findUnique({
    where: {
      id,
    },
  });

  if (!scout) {
    throw new Error("Scout not found");
  }

  await db.scout.update({
    where: {
      id,
    },
    data: {
      isPaid: true,
    },
  });

  return {
    success: "Payment confirmed",
  };
};
