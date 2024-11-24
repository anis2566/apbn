import Link from "next/link";
import { redirect } from "next/navigation";
import { AppStatus } from "@prisma/client";
import { db } from "@/lib/prisma";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { CustomPagination } from "@/components/custom-pagination";
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { Header } from "../../migration/_components/header";
import { TrainingApplicationList } from "./_components/app-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Training Applications",
    description: "Apbn scouts group",
};


interface Props {
    params: {
        id: string;
    },
    searchParams: {
        status: AppStatus;
        page: string;
        perPage: string;
        search: string;
    }
}

const TrainingApps = async ({ params: { id }, searchParams }: Props) => {
    const { status, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const training = await db.training.findUnique({
        where: {
            id
        }
    })

    if (!training) redirect("/dashboard")

    const applications = await db.trainingApplication.findMany({
        where: {
            trainingId: id,
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            }),
            ...(status && { status }),
        },
        include: {
            scout: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalApplication = await db.trainingApplication.count({
        where: {
            trainingId: id,
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            }),
            ...(status && { status }),
        },
    })

    const totalPage = Math.ceil(totalApplication / itemsPerPage)

    return (
        <ContentLayout title="Applications">
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
                            <Link href="/dashboard/app/training">Trainings</Link>
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
                    <CardTitle>{training.title}</CardTitle>
                    <CardDescription>A collection of application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <TrainingApplicationList applications={applications} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default TrainingApps