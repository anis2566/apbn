"use server"

import { db } from "@/lib/db"
import { TrainingSchema, TrainingSchemaType } from "@/schema/training.schema"
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