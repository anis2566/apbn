import { redirect } from "next/navigation";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { EditScoutForm } from "./_components/edit-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit Profile",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const EditForm = async ({ params: { id } }: Props) => {
    const scout = await db.scout.findUnique({
        where: {
            id
        }
    })

    if (!scout) redirect("/")

    return (
        <div className="my-4 space-y-6 px-2">
            <h1 className="text-center text-3xl font-semibold">Edit Application Form</h1>
            <Button asChild variant="expandIcon" Icon={MoveLeft} iconPlacement="left" className="flex gap-x-3 max-w-fit">
                <Link href={`/scout`}>
                    Go Back
                </Link>
            </Button>
            <EditScoutForm scout={scout} />
        </div>
    )
}

export default EditForm