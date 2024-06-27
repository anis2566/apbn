"use server"

import { db } from "@/lib/db"
import { MigrationSchema, MigrationSchemaType, MigrationStatus } from "@/schema/migration.schema"
import { revalidatePath } from "next/cache"

export const APPLY_MIGRATION = async (values: MigrationSchemaType) => {
    const {data, success} = MigrationSchema.safeParse(values)
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

    if(data.unitId === scout.unitId) {
        throw new Error("Migration can not be done in same unit")
    }

    const isApplied = await db.migration.findFirst({
        where: {
            scoutId: data.scoutId,
            status: MigrationStatus.Pending
        }
    })

    if(isApplied) {
        throw new Error("Already applied")
    }

    await db.migration.create({
        data: {
            ...data
        }
    })

    revalidatePath("/scout/unit/manage")

    return {
        success: "Applied successfully"
    }
}


type MigrationStatusType = {
    migrationId: string;
    status: MigrationStatus;
}
export const UPDATE_MIGRATION_STATUS = async ({migrationId, status}:MigrationStatusType) => {
    const migration = await db.migration.findUnique({
        where: {
            id: migrationId
        }
    })
    if(!migration) {
        throw new Error("Migration not found")
    }

    if(status === MigrationStatus.Approved) {
        if(migration.scoutId) {
            await db.scout.update({
                where: {
                    id: migration.scoutId
                },
                data: {
                    unitId: migration.unitId
                }
            })
        }
    }

    await db.migration.update({
        where: {
            id: migrationId
        },
        data: {
            status
        }
    })

    revalidatePath("/dashboard/app/migration")

    return {
        success: "Status updated"
    }
}


export const DELETE_MIGRATION = async (id: string) => {
    const migration = await db.migration.findUnique({
        where: {
            id
        }
    })
    if(!migration) {
        throw new Error("Migration not found")
    }

    await db.migration.delete({
        where: {
            id
        }
    })

    revalidatePath("/dashboard/app/migration")

    return {
        success: "Application deleted"
    }
}