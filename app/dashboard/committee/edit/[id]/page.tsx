import { redirect } from "next/navigation";
import Link from "next/link";
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

import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { EditCommiteeForm } from "./_components/edit-committee-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit Committee",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const EditCommitee = async ({ params: { id } }: Props) => {

    const committee = await db.committee.findUnique({
        where: {
            id: id
        }
    })

    if (!committee) redirect("/dashboard")

    return (
        <ContentLayout title="Committee">
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
                            <Link href="/dashboard/committee">Commitees</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditCommiteeForm committee={committee} />
        </ContentLayout>
    )
}

export default EditCommitee