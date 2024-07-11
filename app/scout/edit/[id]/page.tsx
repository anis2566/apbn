import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { EditScoutForm } from "@/components/dashboard/scout/edit-scout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
    params: {
        id: string;
    }
}

const EditForm = async ({params:{id}}:Props) => {
    const scout = await db.scout.findUnique({
        where: {
            id
        }
    })

    if(!scout) redirect("/")

    return (
        <div className="my-4 space-y-6 px-2">
            <h1 className="text-center text-3xl font-semibold">Edit Application Form</h1>
            <Button asChild variant="gooeyRight">
                <Link href={`/scout`}>
                    Go Back
                </Link>
            </Button>
            <EditScoutForm scout={scout} />
        </div>
    )
}

export default EditForm