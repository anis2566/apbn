import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
  } from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/scout"
import Link from "next/link";
import { RequestList } from "@/components/dashboard/scout/request";
import { db } from "@/lib/db";
import { Section, Status } from "@/schema/scout.schema";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/dashboard/scout/request/header";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        section: Section;
        page: string;
        perPage: string;
        search: string;
    }
  };

const ScoutRequest = async ({searchParams}:Props) => {
    const { section, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;  
    const currentPage = parseInt(page) || 1;

    const scouts = await db.scout.findMany({
        where: {
            // status: Status.Pending
            ...(section && { section }),
            ...(search && {name: {contains: search, mode: "insensitive"}})
        },
        include: {
            unit: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalScout = await db.scout.count({
        where: {
            // status: Status.Pending
            ...(section && { section }),
            ...(search && {name: {contains: search, mode: "insensitive"}})
        },
    })

    const totalPage = Math.round(totalScout / itemsPerPage)

    return (
        <ContentLayout title="Scout">
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
                    <Link href="/dashboard/scout/list">Scout</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage>Request</BreadcrumbPage>
                </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Request List</CardTitle>
                    <CardDescription>A collection of scout request.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <RequestList scouts={scouts} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default ScoutRequest