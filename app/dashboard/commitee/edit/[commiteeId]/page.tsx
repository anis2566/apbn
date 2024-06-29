import { redirect } from "next/navigation";
import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/dashboard"
import { db } from "@/lib/db";
import { EditCommiteeForm } from "@/components/dashboard/commitee/edit-commitee-form";

interface Props {
    params: {
        commiteeId: string;
    }
}

const EditCommitee = async ({params:{commiteeId}}:Props) => {

    const commitee = await db.commitee.findUnique({
        where: {
            id: commiteeId
        }
    })

    if(!commitee) redirect("/dashboard")

    return (
        <ContentLayout title="Commitee">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/commitee/list">Commitees</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditCommiteeForm commitee={commitee} />
        </ContentLayout>
    )
}

export default EditCommitee