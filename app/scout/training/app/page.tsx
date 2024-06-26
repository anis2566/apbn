import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"

import { db } from "@/lib/db";
import { ContentLayout } from "@/components/dashboard"
import { ApplicationList } from "@/components/scout/training/app";
import { Header } from "@/components/scout/training/header";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const TrainingApplications = async ({searchParams}:Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const trainings = await db.trainingApplication.findMany({
        where: {
            ...(search && {
                training: {
                    title: {
                        contains: search, 
                        mode: "insensitive"
                    }
                }
            })
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
            ...(search && {
                training: {
                    title: {
                        contains: search, 
                        mode: "insensitive"
                    }
                }
            })
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