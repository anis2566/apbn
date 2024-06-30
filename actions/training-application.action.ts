"use server"

import { db } from "@/lib/db"
import { TrainingApplicationSchema, TrainingApplicationSchemaType } from "@/schema/training-application.schema"
import { getScout } from "@/services/user.service"

export const CREATE_APPLICATION = async (values: TrainingApplicationSchemaType) => {
    const {data, success} = TrainingApplicationSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const {scoutId} = await getScout()

    const isApplied = await db.trainingApplication.findFirst({
        where: {
            trainingId: data.trainingId,
            scoutId
        }
    })
    if(isApplied) {
        throw new Error("Already applied")
    }

    await db.trainingApplication.create({
        data: {
            ...data,
            scoutId
        }
    })

    return {
        success: "Application successful"
    }
}