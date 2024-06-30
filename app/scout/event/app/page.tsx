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
import { Header } from "@/components/scout/event/app/header";
import { ApplicationList } from "@/components/scout/event/app";
import { getScout } from "@/services/user.service";
import { MigrationStatus } from "@/schema/migration.schema";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        status: MigrationStatus;
    }
};

const EventApps = async ({searchParams}:Props) => {
    const {scoutId} = await getScout()

    const { status, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const applications = await db.eventApplication.findMany({
        where: {
            scoutId,
            ...(status && {status})
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
            scoutId,
            ...(status && {status})
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