import Link from "next/link";
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
import { ContentLayout } from "../../_components/content-layout";
import { Header } from "./_components/header";
import { MigrationList } from "./_components/app-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Migration Applications",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        status: AppStatus;
        page: string;
        perPage: string;
        search: string;
    }
};

const MigrationApp = async ({ searchParams }: Props) => {

    const { status, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const migrations = await db.migration.findMany({
        where: {
            ...(status && { status }),
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            })
        },
        include: {
            scout: {
                include: {
                    unit: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            },
            unit: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalMigration = await db.migration.count({
        where: {
            ...(status && { status }),
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            })
        }
    })

    const totalPage = Math.ceil(totalMigration / itemsPerPage)

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
                        <BreadcrumbPage>Migrations</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Migration List</CardTitle>
                    <CardDescription>A collection of migration application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <MigrationList migrations={migrations} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default MigrationApp;