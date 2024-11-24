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
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { EditAwardForm } from "./_components/edit-award-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit Award",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const EditAward = async ({ params: { id } }: Props) => {

    const award = await db.award.findUnique({
        where: {
            id: id
        }
    })

    if (!award) redirect("/dashboard")

    return (
        <ContentLayout title="Award">
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
                            <Link href="/dashboard/award">Award</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditAwardForm award={award} />
        </ContentLayout>
    )
}

export default EditAward