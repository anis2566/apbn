"use server"

import { db } from "@/lib/db"
import { MigrationStatus } from "@/schema/migration.schema"
import { TrainingApplicationSchema, TrainingApplicationSchemaType } from "@/schema/training-application.schema"
import { getScout } from "@/services/user.service"
import { revalidatePath } from "next/cache"

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



type UpdateStatus = {
    id: string;
    status: MigrationStatus;
}
export const UPDATE_APPLICATION_STATUS = async ({id, status}:UpdateStatus) => {
    const app = await db.trainingApplication.findUnique({
        where: {
            id
        }
    })
    if(!app) {
        throw new Error("Application not found")
    }

    await db.trainingApplication.update({
        where: {
            id
        },
        data: {
            status
        }
    })

    revalidatePath(`/dashboard/app/training/${app.trainingId}`)

    return {
        success: "Status updated"
    }
}


export const DELETE_APPLICATION = async (id: string) => {
    const app = await db.trainingApplication.findUnique({
        where: {
            id
        }
    })
    if(!app) {
        throw new Error("Application not found")
    }

    await db.trainingApplication.delete({
        where: {
            id
        }
    })

    revalidatePath(`/dashboard/app/training/${app.trainingId}`)

    return {
        success: "Application deleted"
    }
}