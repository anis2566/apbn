"use server"

import { db } from "@/lib/db"
import { CouponSchema, CouponSchemaType, Status } from "@/schema/coupon.schema"
import { revalidatePath } from "next/cache"

export const CREATE_COUPON = async (values: CouponSchemaType) => {
    const { data, success } = CouponSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const coupon = await db.coupon.findFirst({
        where: {
            OR: [
                {
                    title: data.title
                },
                {
                    code: data.code
                }
            ]
        }
    })

    if (coupon) {
        throw new Error("Coupon already exists")
    }

    await db.coupon.create({
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard/utils/coupon")

    return {
        success: "Coupon created"
    }
}

type UpdateCoupon = {
    values: CouponSchemaType;
    couponId: string;
}
export const UPDATE_COUPON = async ({values, couponId}:UpdateCoupon) => {
    const { data, success } = CouponSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const coupon = await db.coupon.findUnique({
        where: {
            id: couponId
        }
    })

    if (!coupon) {
        throw new Error("Coupon not found")
    }

    await db.coupon.update({
        where: {
            id: couponId
        },
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard/utils/coupon")

    return {
        success: "Coupon updated"
    }
}


export const DELETE_COUPON = async (couponId: string) => {
    const coupon = await db.coupon.findUnique({
        where: {
            id: couponId
        }
    })

    if (!coupon) {
        throw new Error("Coupon not found")
    }

    await db.coupon.delete({
        where: {
            id: couponId
        },
    })

    revalidatePath("/dashboard/utils/coupon")

    return {
        success: "Coupon deleted"
    }
}


export const APPLY_COUPON = async (code: string) => {
    const coupon = await db.coupon.findFirst({
        where: {
            code,
            expire: {
                gte: new Date()
            },
            status: Status.Active
        }
    })

    if (!coupon) {
        throw new Error("Invalid coupon or expired")
    }

    return {
        value: coupon.value
    }
}