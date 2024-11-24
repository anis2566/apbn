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
import { EditTrainingForm } from "./_components/edit-training-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit Training",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const EditTraining = async ({ params: { id } }: Props) => {

    const training = await db.training.findUnique({
        where: {
            id
        }
    })

    if (!training) redirect("/dashboard")

    return (
        <ContentLayout title="Training">
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
                            <Link href="/dashboard/training/list">Trainings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditTrainingForm training={training} />
        </ContentLayout>
    )
}

export default EditTraining