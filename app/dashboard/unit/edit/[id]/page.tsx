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
import { EditUnitForm } from "./_components/edit-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit Unit",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const EditUnit = async ({ params: { id } }: Props) => {

    const unit = await db.unit.findUnique({
        where: {
            id: id
        }
    })

    if (!unit) redirect("/dashboard")

    return (
        <ContentLayout title="Unit">
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
                            <Link href="/dashboard/unit">Unit</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditUnitForm unit={unit} />
        </ContentLayout>
    )
}

export default EditUnit