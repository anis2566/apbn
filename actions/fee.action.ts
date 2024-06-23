"use server"

import { db } from "@/lib/db"
import { FeeSchema, FeeSchemaType } from "@/schema/fee.schema"
import { revalidatePath } from "next/cache"

export const CREATE_FEE = async (values: FeeSchemaType) => {
    const { data, success } = FeeSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const fee = await db.fee.findFirst({
        where: {
            title: data.title
        }
    })

    if (fee) {
        throw new Error("Fee with this title exists")
    }

    await db.fee.create({
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard/utils/fee")

    return {
        success: "Fee assigned"
    }
}

type UpdateFee = {
    values: FeeSchemaType,
    feeId: string;
}
export const UPDATE_FEE = async ({values, feeId}:UpdateFee) => {
    const { data, success } = FeeSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const fee = await db.fee.findUnique({
        where: {
            id: feeId
        }
    })

    if (!fee) {
        throw new Error("Fee not found")
    }

    await db.fee.update({
        where: {
            id: feeId
        },
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard/utils/fee")

    return {
        success: "Fee updated"
    }
}


export const DELETE_FEE = async (feeId: string) => {
    const fee = await db.fee.findUnique({
        where: {
            id: feeId
        }
    })

    if (!fee) {
        throw new Error("Fee not found")
    }

    await db.fee.delete({
        where: {
            id: feeId
        }
    })

    revalidatePath("/dashboard/utils/fee")

    return {
        success: "Fee deleted"
    }
}


export const GET_FEE_BY_TITLE = async (title: string) => {
    const fee = await db.fee.findFirst({
        where: {
            title
        }
    })

    if (!fee) {
        throw new Error("Fee not found")
    }

    return {
        fee
    }
}