import Link from "next/link";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/db";
import { ContentLayout } from "@/components/scout"
import { EditScoutForm } from "@/components/dashboard/scout/edit-scout";

interface Props {
    params: {
        id: string;
    }
}

const EditProfile = async ({params:{id}}:Props) => {
    const scout = await db.scout.findUnique({
        where: {
            id
        }
    })

    if(!scout) redirect("/")

    return (
        <ContentLayout title="Profile">
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
                    <Link href="/scout/profile">Profile</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Edit</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditScoutForm scout={scout} />
        </ContentLayout>
    )
}

export default EditProfile;