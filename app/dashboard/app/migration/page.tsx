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

const MigrationApp = async () => {
    const migrations = await db.migration.findMany({
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
        }
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
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default MigrationApp;