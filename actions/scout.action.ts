"use server"

import { db } from "@/lib/db"
import { Role, ScoutSchema, ScoutSchemaType, Status } from "@/schema/scout.schema"
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

    const unit = await db.unit.findUnique({
        where: {
            id: data.preferedUnit,
        },
        include: {
            scouts: {
                select: {
                    id: true
                }
            },
            leader: {
                include: {
                    user: {
                        select: {
                            clerkId: true
                        }
                    }
                }
            }
        },
    })

    if(!unit) {
        throw new Error("Unit not found")
    }

    const isCompletedUnit = unit.limit + 1 === unit.scouts.length

    if(isCompletedUnit) {
        throw new Error("This unit is full of scout.")
    }

    const { userId, clerkId } = await getUser()
    
    const newScout = await db.scout.create({
        data: {
            ...data,
            userId,
            role: data.role === Role.Scout ? [data.role] : [Role.Scout, data.role]
        }
    })

    await db.user.update({
        where: {
            id: userId
        },
        data: {
            role: Role.Scout
        }
    })

    await clerkClient.users.updateUser(clerkId, {
        publicMetadata: {
            role: newScout.role.join(" "),
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

    if(status === Status.Active) {
        await db.scout.update({
            where: {
                id
            },
            data: {
                unitId: scout.preferedUnit
            }
        })

        await clerkClient.users.updateUser(scout.user?.clerkId, {
            publicMetadata: {
                role: scout.role.join(" "),
                status: "active"
            }
        })

    }

    await db.scout.update({
        where: {
            id
        },
        data: {
            status
        }
    })

    revalidatePath("/dashboard/scout/request")
    revalidatePath("/dashboard/scout/list")
    revalidatePath("/dashboard/scout/verified")
    revalidatePath("/dashboard/scout/cancelled")
    revalidatePath("/scout/unit/request")

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
            ...data,
            role: data.role === Role.Scout ? [Role.Scout] : [Role.Scout, data.role]
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


type MigrateScout = {
    scoutId: string;
    unitId: string;
}
export const MIGRATE_SCOUT = async ({scoutId, unitId}:MigrateScout) => {
    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        }
    })

    if(!scout) {
        throw new Error("Scout not found")
    }

    const unit = await db.unit.findUnique({
        where: {
            id: unitId
        }
    })

    if(!unit) {
        throw new Error("Unit not found")
    }

    await db.scout.update({
        where: {
            id: scoutId
        },
        data: {
            unitId
        }
    })

    revalidatePath(`/dashboard/unit/${unitId}`)

    return {
        success: "Migration successful"
    }
}