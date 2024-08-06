"use server"

import { db } from "@/lib/db"
import { MigrationStatus } from "@/schema/migration.schema"
import { TrainingApplicationSchema, TrainingApplicationSchemaType } from "@/schema/training-application.schema"
import { TrainingSchema, TrainingSchemaType } from "@/schema/training.schema"
import { sendNotification } from "@/services/notification.service"
import { getAdmin, getScout } from "@/services/user.service"
import { revalidatePath } from "next/cache"

export const CREATE_TRAINING = async (values: TrainingSchemaType) => {
    const {data, success} = TrainingSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid field value")
    }

    await db.training.create({
        data: {
            ...data
        }
    })

    return {
        success: "Training created"
    }
}


type UpdateTraining = {
    id: string;
    values: TrainingSchemaType;
}
export const UPDATE_TRAINING = async ({id, values}:UpdateTraining) => {
    const {data, success} = TrainingSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid field value")
    }

    const training = await db.training.findUnique({
        where: {
            id
        }
    })
    if(!training) {
        throw new Error("Training not found")
    }

    await db.training.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    return {
        success: "Training updated"
    }
}


export const DELETE_TRAINING = async (id: string) => {
    const training = await db.training.findUnique({
        where: {
            id
        }
    })
    if(!training) {
        throw new Error("Training not found")
    }

    await db.training.delete({
        where: {
            id
        }
    })

    revalidatePath("/dashboard/training/list")

    return {
        success: "Training deleted"
    }
}


export const APPLY_TRAINING = async (values:TrainingApplicationSchemaType) => {
    const {data, success} = TrainingApplicationSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid field value")
    }

    const training = await db.training.findUnique({
        where: {
            id: data.trainingId
        }
    })

    if(!training) {
        throw new Error("Training not found")
    }

    const {scoutId, clerkId, scout} = await getScout()

    const applied = await db.trainingApplication.findUnique({
        where: {
            id: data.trainingId,
            scoutId
        }
    })

    if(applied) {
        throw new Error("Already applied")
    }

    await db.trainingApplication.create({
        data: {
            ...data,
            scoutId
        }
    })

    const {adminClerkId} = await getAdmin()
    await sendNotification({
        trigger: "training-apply",
        actor: {
            id: clerkId,
            name: scout.name
        },
        recipients: [adminClerkId],
        data: {
            training: training.title,
            redirectUrl: `/dashboard/app/training/${training.id}`
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
export const UPDATE_STATUS = async ({id, status}:UpdateStatus) => {
    const app = await db.trainingApplication.findUnique({
        where: {
            id
        },
        include: {
            scout: {
                include: {
                    user: {
                        select: {
                            clerkId: true
                        }
                    }
                }
            },
            training: true
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

    const {adminClerkId} = await getAdmin()
    await sendNotification({
        trigger: "training-response",
        actor: {
            id: adminClerkId,
        },
        recipients: [app?.scout?.user?.clerkId ?? ""],
        data: {
            training: app?.training?.title,
            status
        }
    })

    revalidatePath(`/dashboard/app/training/${app.trainingId}`)

    return {
        success: "Stuatus updated"
    }
}