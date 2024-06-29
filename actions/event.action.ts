"use server"

import { db } from "@/lib/db"
import { EventSchema, EventSchemaType } from "@/schema/event.schema"
import { revalidatePath } from "next/cache"

export const CREATE_EVENT = async (values: EventSchemaType) => {
    const {data, success} = EventSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    await db.event.create({
        data: {
            ...data
        }
    })

    revalidatePath("/dashboard/event/list")

    return {
        success: "Event created"
    }
}


type UpdateEvent = {
    id: string;
    values: EventSchemaType
}
export const UPDATE_EVENT = async ({id, values}:UpdateEvent) => {
    const {data, success} = EventSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const event = await db.event.findUnique({
        where: {
            id
        }
    })
    if(!event) {
        throw new Error("Event not found")
    }

    await db.event.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    return {
        success: "Event updated"
    }
}


export const DELETE_EVENT = async (id: string) => {
    const event = await db.event.findUnique({
        where: {
            id
        }
    })
    if(!event) {
        throw new Error("Event not found")
    }

    await db.event.delete({
        where: {
            id
        }
    })

    revalidatePath("/dashboard/event/list")

    return {
        success: "Event deleted"
    }
}