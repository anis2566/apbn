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