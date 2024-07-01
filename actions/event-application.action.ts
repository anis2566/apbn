"use server"

import { db } from "@/lib/db"
import { EventApplicationSchema, EventApplicationSchemaType } from "@/schema/event-application.schema"
import { MigrationStatus } from "@/schema/migration.schema"
import { revalidatePath } from "next/cache"

export const CREATE_APPLICATION = async (values: EventApplicationSchemaType) => {
    const {data, success} = EventApplicationSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const existApplication = await db.eventApplication.findFirst({
        where: {
            eventId: data.eventId,
            scoutId: data.scoutId
        }
    })
    if(existApplication) {
        throw new Error("Alread applied")
    }

    const application = await db.eventApplication.create({
        data: {
            ...data
        },
        select: {
            id: true
        }
    })

    return {
        application
    }
}


type UpdateStatus = {
    id: string;
    status: MigrationStatus;
}
export const UPDATE_APPLICATION_STATUS = async ({id, status}:UpdateStatus) => {
    const app = await db.eventApplication.findUnique({
        where: {
            id
        }
    })
    if(!app) {
        throw new Error("Application not found")
    }

    await db.eventApplication.update({
        where: {
            id
        },
        data: {
            status
        }
    })

    revalidatePath(`/dashboard/app/event/${app.eventId}`)

    return {
        success: "Status updated"
    }
}


export const DELETE_APPLICATION = async (id: string) => {
    const app = await db.eventApplication.findUnique({
        where: {
            id
        }
    })
    if(!app) {
        throw new Error("Application not found")
    }

    await db.eventApplication.delete({
        where: {
            id
        }
    })

    revalidatePath(`/dashboard/app/event/${app.eventId}`)

    return {
        success: "Application deleted"
    }
}