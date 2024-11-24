import Link from "next/link";
import { Metadata } from "next";
import { redirect } from "next/navigation";

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
import { ApplyForm } from "./_components/apply-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Training Application",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const TrainingApply = async ({ params: { id } }: Props) => {

    const app = await db.training.findUnique({
        where: {
            id
        }
    })

    if (!app) redirect("/scout")

    return (
        <ContentLayout title="Training">
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
                            <Link href="/scout/training">Trainings</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Apply</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <ApplyForm trainingId={id} />
        </ContentLayout>
    )
}

export default TrainingApply;