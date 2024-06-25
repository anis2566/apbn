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

import { ContentLayout } from "@/components/scout"
import { db } from "@/lib/db";
import { EditScoutForm } from "@/components/dashboard/scout/edit-scout";

interface Props {
    params: {
        scoutId: string;
    }
}

const EditScout = async ({params:{scoutId}}:Props) => {

    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        }
    })

    if(!scout) redirect("/dashboard")

    return (
        <ContentLayout title="Scout">
            <Breadcrumb>
                <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href="/scout">Dashboard</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                    <Link href="/scout/unit">Unit</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Edit Scout</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditScoutForm scout={scout} />
        </ContentLayout>
    )
}

export default EditScout;