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
import { Header } from "@/components/dashboard/app/migration/header";
import { MigrationList } from "@/components/dashboard/app/migration";
import { db } from "@/lib/db";
import { MigrationStatus } from "@/schema/migration.schema";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        status: MigrationStatus;
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

    const totalPage = Math.round(totalMigration / itemsPerPage)

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