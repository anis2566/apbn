import Link from "next/link";
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

import { db } from "@/lib/prisma";
import { ContentLayout } from "../_components/content-layout";
import { Header } from "../event/_components/header";
import { CustomPagination } from "@/components/custom-pagination";
import { AwardList } from "./_components/award-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Awards",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const Awards = async ({ searchParams }: Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const awards = await db.award.findMany({
        where: {
            ...(search && { title: { contains: search, mode: "insensitive" } })
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalAward = await db.award.count({
        where: {
            ...(search && { title: { contains: search, mode: "insensitive" } })
        }
    })

    const totalPage = Math.ceil(totalAward / itemsPerPage)

    return (
        <ContentLayout title="Award">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Award List</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Award List</CardTitle>
                    <CardDescription>A collection of award.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <AwardList awards={awards} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Awards