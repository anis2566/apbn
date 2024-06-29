"use server"

import { db } from "@/lib/db"
import { CommiteeSchema, CommiteeSchemaType } from "@/schema/commitee.schema"
import { revalidatePath } from "next/cache"

export const CREATE_COMMITEE = async (values:CommiteeSchemaType) => {
    const {data, success} = CommiteeSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const commite = await db.commitee.findFirst({
        where: {
            section: data.section,
            designation: data.designation
        }
    })
    if(commite) {
        throw new Error("Already exists")
    }

    await db.commitee.create({
        data: {
            ...data
        }
    })

    return {
        success: "Commitee created"
    }
}


type UpdateCommitee = {
    id: string;
    values: CommiteeSchemaType;
}
export const UPDATE_COMMITEE = async ({id, values}:UpdateCommitee) => {
    const {data, success} = CommiteeSchema.safeParse(values)
    if(!success) {
        throw new Error("Invalid input value")
    }

    const commite = await db.commitee.findUnique({
        where: {
            id
        }
    })
    if(!commite) {
        throw new Error("Commitee not found")
    }

    await db.commitee.update({
        where: {
            id
        },
        data: {
            ...data
        }
    })

    revalidatePath(`/dashboard/commitee/edit/${id}`)

    return {
        success: "Commitee updated"
    }
}


export const DELETE_COMMITEE = async (id: string) => {
    const commite = await db.commitee.findUnique({
        where: {
            id
        }
    })
    if(!commite) {
        throw new Error("Commitee not found")
    }

    await db.commitee.delete({
        where: {
            id
        }
    })

    revalidatePath(`/dashboard/commitee/list`)

    return {
        success: "Commitee deleted"
    }
}