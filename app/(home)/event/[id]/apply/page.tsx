import { Metadata } from "next";
import { redirect } from "next/navigation";

import { db } from "@/lib/prisma";
import { ApplyForm } from "./_components/apply-form";

export const metadata: Metadata = {
    title: "Apply",
    description: "Apply for the event",
}

interface Props {
    params: {
        id: string;
    }
}

const Apply = async ({ params: { id } }: Props) => {
    const event = await db.event.findUnique({
        where: {
            id: id
        }
    })

    if (!event) redirect("/")

    return (
        <div className="w-full max-w-screen-xl mx-auto py-6">
            <ApplyForm id={id} />
        </div>
    )
}

export default Apply