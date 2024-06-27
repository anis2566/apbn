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