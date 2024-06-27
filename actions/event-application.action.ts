"use server"

import { db } from "@/lib/db"
import { EventApplicationSchema, EventApplicationSchemaType } from "@/schema/event-application.schema"

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