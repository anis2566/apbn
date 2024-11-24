import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/scout/_components/content-layout";
import { EditScoutForm } from "./_components/edit-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit Scout",
    description: "Apbn scouts group",
};


interface Props {
    params: {
        scoutId: string;
    }
}

const EditScout = async ({ params: { scoutId } }: Props) => {

    const scout = await db.scout.findUnique({
        where: {
            id: scoutId
        }
    })

    if (!scout) redirect("/dashboard")

    return (
        <ContentLayout title="Scout">
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
                            <Link href="/dashboard/scout/list">Scout</Link>
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

export default EditScout;