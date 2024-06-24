"use server"

import { db } from "@/lib/db"
import { AwardSchema, AwardSchemaType } from "@/schema/award.schema"
import { revalidatePath } from "next/cache"

export const CREATE_AWARD = async (values: AwardSchemaType) => {
    const {data, success} = AwardSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const award = await db.award.findFirst({
        where: {
            title: data.title
        }
    })
    if(award) {
        throw new Error("Award already exists")
    }

    await db.award.create({
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard/scout/award")

    return {
        success: "Award created"
    }
}


type UpdateAward = {
    awardId: string;
    values: AwardSchemaType;
}
export const UPDATE_AWARD = async ({values, awardId}:UpdateAward) => {
    const {data, success} = AwardSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const award = await db.award.findUnique({
        where: {
            id: awardId
        }
    })
    if(!award) {
        throw new Error("Award not found")
    }

    await db.award.update({
        where: {
            id: awardId
        },
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard/scout/award")

    return {
        success: "Award updated"
    }
}



export const DELETE_AWARD = async (id: string) => {
    const award = await db.award.findUnique({
        where: {
            id
        }
    })
    if(!award) {
        throw new Error("Award not found")
    }

    await db.award.delete({
        where: {
            id
        },
    })

    revalidatePath("/dashboard/scout/award")

    return {
        success: "Award deleted"
    }
}