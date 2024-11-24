import { redirect } from "next/navigation";
import { Metadata } from "next";

import { db } from "@/lib/prisma";
import { ScoutFormPdf } from "./_components/scout-form-pdf";

export const metadata: Metadata = {
    title: "APBn Scouts | Download Form",
    description: "Apbn scouts group",
};


interface Props {
    params: {
        scoutId: string;
    }
}

const ScoutForm = async ({params: {scoutId}}:Props) => {
    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        },
        include: {
            unit: true
        }
    })

    if(!scout) redirect("/")

    return (
        <div>
            <ScoutFormPdf scout={scout} />
        </div>
    )
}

export default ScoutForm


