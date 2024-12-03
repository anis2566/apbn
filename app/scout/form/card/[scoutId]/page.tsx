import { Metadata } from "next"
import { redirect } from "next/navigation"

import { db } from "@/lib/prisma"
import { ScoutCardPdf } from "./_components/scout-card-pdf"

export const metadata: Metadata = {
    title: "Scout Card",
    description: "Scout Card",
}

const ScoutCardPage = async ({ params }: { params: { scoutId: string } }) => {
    const scout = await db.scout.findUnique({
        where: {
            id: params.scoutId
        },
        include: {
            unit: true
        }
    })

    if (!scout) redirect("/")
    return (
        <div>
            <ScoutCardPdf scout={scout} />
        </div>
    )
}

export default ScoutCardPage
