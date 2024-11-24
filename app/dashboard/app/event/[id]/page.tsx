import Link from "next/link";
import { redirect } from "next/navigation";
import { AppStatus } from "@prisma/client";
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
import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { EventApplicationList } from "./_components/app-list";
import { Header } from "../../migration/_components/header";

export const metadata: Metadata = {
    title: "APBn Scouts | Event Applications",
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

const EventApplications = async ({ params: { id }, searchParams }: Props) => {
    const { status, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const event = await db.event.findUnique({
        where: {
            id: id
        }
    })

    if (!event) redirect("/dashboard")

    const applications = await db.eventApplication.findMany({
        where: {
            eventId: id,
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

    const totalApplication = await db.eventApplication.count({
        where: {
            eventId: id,
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            }),
            ...(status && { status }),
        }
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
                            <Link href="/dashboard/app/event">Events</Link>
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
                    <CardTitle>{event.title}</CardTitle>
                    <CardDescription>A collection of application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <EventApplicationList applications={applications} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default EventApplications