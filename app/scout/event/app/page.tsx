import Link from "next/link";
import { AppStatus } from "@prisma/client";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { CustomPagination } from "@/components/custom-pagination";
import { GET_SCOUT } from "@/services/user.service";
import { ContentLayout } from "../../_components/content-layout";
import { db } from "@/lib/prisma";
import { Header } from "./_components/header";
import { ApplicationList } from "./_components/app-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Event Applications",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        status: AppStatus;
    }
};

const EventApps = async ({ searchParams }: Props) => {
    const { status, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const { scout } = await GET_SCOUT()

    if (!scout) redirect("/scout")

    const applications = await db.eventApplication.findMany({
        where: {
            scoutId: scout.id,
            ...(status && { status })
        },
        include: {
            event: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalApps = await db.eventApplication.count({
        where: {
            scoutId: scout.id,
            ...(status && { status })
        }
    })

    const totalPage = Math.ceil(totalApps / itemsPerPage)

    return (
        <ContentLayout title="Event">
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
                            <Link href="/scout/event">Events</Link>
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
                    <CardDescription>A collection of event application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ApplicationList applications={applications} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default EventApps