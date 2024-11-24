import Link from "next/link";
import { Section, Status } from "@prisma/client";
import { Metadata } from "next";

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
import { ContentLayout } from "../_components/content-layout";
import { Header } from "./request/_components/header";
import { CustomPagination } from "@/components/custom-pagination";
import { ScoutList } from "./_components/scout-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Scouts",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        section: Section;
        page: string;
        perPage: string;
        search: string;
    }
};

const Scouts = async ({ searchParams }: Props) => {
    const { section, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const scouts = await db.scout.findMany({
        where: {
            status: Status.Active,
            ...(section && { section }),
            ...(search && { name: { contains: search, mode: "insensitive" } })
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
            status: Status.Active,
            ...(section && { section }),
            ...(search && { name: { contains: search, mode: "insensitive" } })
        },
    })

    const totalPage = Math.ceil(totalScout / itemsPerPage)

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
                        <BreadcrumbPage>List</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Scout List</CardTitle>
                    <CardDescription>A collection of activev scout.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ScoutList scouts={scouts} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Scouts