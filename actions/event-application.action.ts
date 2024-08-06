"use server"

import { db } from "@/lib/db"
import { EventApplicationSchema, EventApplicationSchemaType } from "@/schema/event-application.schema"
import { MigrationStatus } from "@/schema/migration.schema"
import { sendNotification } from "@/services/notification.service"
import { getAdmin, getScout } from "@/services/user.service"
import { revalidatePath } from "next/cache"

export const CREATE_APPLICATION = async (values: EventApplicationSchemaType) => {
    const {data, success} = EventApplicationSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const {clerkId, scout} = await getScout()

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
        include: {
            event: true
        }
    })

    const {adminClerkId} = await getAdmin()
    await sendNotification({
        trigger: "event-application",
        actor: {
            id: clerkId,
            name: scout.name
        },
        recipients: [adminClerkId],
        data: {
            event: application.event?.title,
            redirectUrl: `/dashboard/app/event/${application.eventId}`
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
        },
        include: {
            event: true,
            scout: {
                include: {
                    user: {
                        select: {
                            clerkId: true
                        }
                    }
                }
            }
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

    const {adminClerkId} = await getAdmin()
    await sendNotification({
        trigger: "event-application-response",
        actor: {
            id: adminClerkId
        },
        recipients: [app.scout?.user?.clerkId || ""],
        data: {
            event: app.event?.title,
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
