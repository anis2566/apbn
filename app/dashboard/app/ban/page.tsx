import Link from "next/link";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { ContentLayout } from "@/components/dashboard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/dashboard/app/migration/header";
import { MigrationList } from "@/components/dashboard/app/migration";
import { db } from "@/lib/db";
import { MigrationStatus } from "@/schema/migration.schema";
import { BanList } from "@/components/dashboard/app/ban";

interface Props {
    searchParams: {
        status: MigrationStatus;
        page: string;
        perPage: string;
        search: string;
    }
};

const BanApp = async ({searchParams}:Props) => {

    const { status, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const bans = await db.ban.findMany({
        where: {
            ...(status && {status}),
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            })
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
                        <BreadcrumbPage>Bans</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Ban List</CardTitle>
                    <CardDescription>A collection of ban application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <BanList bans={bans} />
                    {/* <MigrationList migrations={migrations} /> */}
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default BanApp;