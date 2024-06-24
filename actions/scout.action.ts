"use server"

import { db } from "@/lib/db"
import { ScoutSchema, ScoutSchemaType, Status } from "@/schema/scout.schema"
import { getUser } from "@/services/user.service"
import { clerkClient } from "@clerk/nextjs/server"
import { revalidatePath } from "next/cache"

export const CREATE_SCOUT = async (values: ScoutSchemaType) => {
    const {success, data} = ScoutSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const scout = await db.scout.findFirst({
        where: {
            OR: [
                {
                    phone: values.phone
                },
                {
                    email: values.email
                }
            ]
        }
    })

    if (scout) {
        throw new Error("Scout already exists")
    }

    const { userId, clerkId } = await getUser()
    
    const newScout = await db.scout.create({
        data: {
            ...data,
            userId
        }
    })

    await db.user.update({
        where: {
            id: userId
        },
        data: {
            role: "Scout"
        }
    })

    await clerkClient.users.updateUser(clerkId, {
        publicMetadata: {
            role: "scout",
            status: "pending"
        }
    })

    return {
        success: "Registration successfull",
        id: newScout.id
    }
}


export const GET_SCOUT = async (scoutId: string) => {
    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        }
    })

    if (!scout) {
        throw new Error("Scout not found")
    }

    return {scout}
}


type UpdateStatus = {
    id: string;
    status: Status;
}
export const UPDATE_SCOUT_STATUS = async ({id, status}:UpdateStatus) => {
    const scout = await db.scout.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    clerkId: true
                }
            }
        }
    })

    if (!scout) {
        throw new Error("Scout not found")
    }

    await db.scout.update({
        where: {
            id
        },
        data: {
            status
        }
    })

    await clerkClient.users.updateUser(scout.user.clerkId, {
        publicMetadata: {
            role: scout.role,
            status
        }
    })

    revalidatePath("/dashboard/scout/request")
    // revalidatePath("/dashboard/scout/list")
    // revalidatePath("/dashboard/scout/verified")
    // revalidatePath("/dashboard/scout/cancelled")

    return {
        success: "Status updated"
    }
}


type UpdateScout = {
    values: ScoutSchemaType;
    id: string;
}
export const UPDATE_SCOUT = async ({values, id}:UpdateScout) => {
    const {success, data} = ScoutSchema.safeParse(values)
    if (!success) {
        throw new Error("Invalid input value")
    }

    const scout = await db.scout.findUnique({
        where: {
            id
        },
        include: {
            user: {
                select: {
                    clerkId: true
                }
            }
        }
    })

    if (!scout) {
        throw new Error("Scout not found")
    }

    await db.scout.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    revalidatePath(`/dashboard/scout/${id}`)

    return {
        success: "Scout updated"
    }
}


export const DELETE_SCOUT = async (scoutId: string) => {
    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        },
        include: {
            user: {
                select: {
                    clerkId: true
                }
            }
        }
    })

    if(!scout) {
        throw new Error("Scout not found")
    }

    await clerkClient.users.deleteUser(scout?.user.clerkId || "")

    revalidatePath("/dashboard/scout/request")
    // revalidatePath("/dashboard/scout/list")
    // revalidatePath("/dashboard/scout/verified")
    // revalidatePath("/dashboard/scout/cancelled")

    return {
        success: "Scout deleted"
    }
}


type CardStatus = {
    scoutId: string;
    status: boolean;
}
export const UPDATE_SCOUT_CARD_STATUS = async ({scoutId, status}:CardStatus) => {
    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        }
    })

    if (!scout) {
        throw new Error("Scout not found")
    }

    await db.scout.update({
        where: {
            id: scoutId
        },
        data: {
            allowCard: status
        }
    })

    revalidatePath("/dashboard/scout/request")
    revalidatePath("/dashboard/scout/list")
    // revalidatePath("/dashboard/scout/verified")
    // revalidatePath("/dashboard/scout/cancelled")

    return {
        success: "Status updated"
    }
}


export const GET_SCOUTS_BY_NAME = async (name: string) => {
    const scouts = await db.scout.findMany({
        where: {
            status: Status.Active || Status.Verified,
            ...(name && {name: {contains:name, mode: "insensitive"}})
        },
        select: {
            name: true,
            apsId: true,
            imageUrl: true,
            id: true
        },
        orderBy: {
            createdAt: "desc"
        },
        take: 3,
    })

    return {scouts}
}