import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ContentLayout } from "@/components/dashboard"
import { db } from "@/lib/db";
import { EventList } from "@/components/dashboard/app/event";
import { MigrationStatus } from "@/schema/migration.schema";
import { Header } from "@/components/dashboard/app/event/header";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const EventApp = async ({searchParams}:Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const events = await db.event.findMany({
        where: {
            ...(search && {title: {contains: search, mode: "insensitive"}})
        },
        include: {
            applications: {
                where: {
                    status: MigrationStatus.Approved
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalEvent = await db.event.count({
        where: {
            ...(search && {title: {contains: search, mode: "insensitive"}})
        }
    })

    const totalPage = Math.ceil(totalEvent / itemsPerPage)

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
                        <BreadcrumbPage>Events</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Event List</CardTitle>
                    <CardDescription>A collection of event.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <EventList events={events} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default EventApp