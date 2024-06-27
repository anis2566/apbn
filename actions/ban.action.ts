"use server"

import { db } from "@/lib/db"
import { BanSchema, BanSchemaType } from "@/schema/ban.schema"
import { MigrationStatus } from "@/schema/migration.schema"
import { clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const APPLY_BAN = async (values: BanSchemaType) => {
    const {data, success} = BanSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const scout = await db.scout.findUnique({
        where: {
            id: data.scoutId
        }
    })

    if(!scout) {
        throw new Error("Scout not found")
    }

    const isApplied = await db.ban.findFirst({
        where: {
            scoutId: data.scoutId,
        }
    })

    if(isApplied) {
        throw new Error("Already applied")
    }

    await db.ban.create({
        data: {
            ...data
        }
    })

    revalidatePath("/scout/unit/manage")

    return {
        success: "Applied successfully"
    }
}


type UpdateStatus = {
    banId: string;
    status: MigrationStatus;
}
export const UPDATE_BAN_STATUS = async ({banId, status}:UpdateStatus) => {
    const ban = await db.ban.findUnique({
        where: {
            id: banId
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
            }
        }
    })
    if(!ban) {
        throw new Error("Ban app not found")
    }

    if(status === MigrationStatus.Approved) {
        await clerkClient.users.deleteUser(ban.scout?.user?.clerkId || "")

        await db.scout.delete({
            where: {
                id: ban.scout?.id
            }
        })
    }

    await db.ban.update({
        where: {
            id: banId
        },
        data: {
            status
        }
    })

    revalidatePath("/dashboard/app/ban")

    return {
        success: "Status updated"
    }

}


export const DELETE_BAN = async (banId: string) => {
    const ban = await db.ban.findUnique({
        where: {
            id: banId
        },
    })
    if(!ban) {
        throw new Error("Ban app not found")
    }

    await db.ban.delete({
        where: {
            id: banId
        }
    })
    
    revalidatePath("/dashboard/app/ban")

    return {
        success: "Ban application deleted"
    }
}