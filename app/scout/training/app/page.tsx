import { Metadata } from "next";
import { AppStatus } from "@prisma/client";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "../../event/app/_components/header";
import { ApplicationList } from "./_components/app-list";
import { GET_SCOUT } from "@/services/user.service";

export const metadata: Metadata = {
    title: "APBn Scouts | Training Applications",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        status: AppStatus;
    }
};

const TrainingApplications = async ({ searchParams }: Props) => {
    const { status, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const { scout } = await GET_SCOUT()

    if (!scout) redirect("/scout")

    const trainings = await db.trainingApplication.findMany({
        where: {
            scoutId: scout.id,
            ...(status && { status })
        },
        include: {
            training: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalApp = await db.trainingApplication.count({
        where: {
            scoutId: scout.id,
            ...(status && { status })
        },
    })

    const totalPage = Math.ceil(totalApp / itemsPerPage)

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
                        <BreadcrumbPage>Applications</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Applications</CardTitle>
                    <CardDescription>A collection of training application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ApplicationList trainings={trainings} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default TrainingApplications