"use server"

import { db } from "@/lib/db"
import { BanSchema, BanSchemaType } from "@/schema/ban.schema"
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