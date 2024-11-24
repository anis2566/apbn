import Link from "next/link";
import { CommiteeSection } from "@prisma/client";
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
import { ContentLayout } from "../_components/content-layout";
import { Header } from "./_components/header";
import { CommiteeList } from "./_components/committee-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Committee List",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        section: CommiteeSection;
        page: string;
        perPage: string;
        search: string;
    }
};

const Commitees = async ({ searchParams }: Props) => {
    const { section, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const committees = await db.committee.findMany({
        where: {
            ...(section && { section }),
            ...(search && { title: { contains: search, mode: "insensitive" } })
        },
        include: {
            members: {
                select: {
                    id: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalCommittee = await db.committee.count({
        where: {
            ...(section && { section }),
            ...(search && { title: { contains: search, mode: "insensitive" } })
        },
    })

    const totalPage = Math.ceil(totalCommittee / itemsPerPage)

    return (
        <ContentLayout title="Committee">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Commitee List</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Committee List</CardTitle>
                    <CardDescription>A collection of committee.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <CommiteeList committees={committees} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Commitees