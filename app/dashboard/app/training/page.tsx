import Link from "next/link";
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
import { ContentLayout } from "../../_components/content-layout";
import { Header } from "../../event/_components/header";
import { TrainingList } from "./_components/training-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Training Applications",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const Trainings = async ({ searchParams }: Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const trainings = await db.training.findMany({
        where: {
            ...(search && { title: { contains: search, mode: "insensitive" } })
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalTraining = await db.training.count({
        where: {
            ...(search && { title: { contains: search, mode: "insensitive" } })
        }
    })

    const totalPage = Math.ceil(totalTraining / itemsPerPage)

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
                        <BreadcrumbPage>Trainings</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Training List</CardTitle>
                    <CardDescription>A collection of training.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <TrainingList trainings={trainings} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Trainings;