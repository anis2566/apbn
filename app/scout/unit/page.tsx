import Link from "next/link";
import { redirect } from "next/navigation";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { ContentLayout } from "@/components/scout"
import { getScout } from "@/services/user.service";
import { db } from "@/lib/db";
import { Header } from "@/components/scout/unit/manage/header";
import { ScoutList } from "@/components/scout/unit/manage";
import { MigrationStatus } from "@/schema/migration.schema";
import { Status } from "@/schema/scout.schema";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const Unit = async ({ searchParams }: Props) => {
    const { scoutId } = await getScout()

    const unit = await db.unit.findUnique({
        where: {
            leaderId: scoutId
        },
        include: {
            scouts: {
                where: {
                    status: Status.Active || Status.Verified,
                    id: {
                        not: scoutId
                    }
                },
                select: {
                    id: true
                }
            }
        }
    })

    if (!unit) redirect("/scout")

    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const scouts = await db.scout.findMany({
        where: {
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            unitId: unit.id,
            id: {
                not: scoutId
            },
            status: {
                equals: Status.Active || Status.Verified
            }
        },
        include: {
            migrations: {
                where: {
                    status: MigrationStatus.Pending
                },
                take: 1
            },
            bans: {
                where: {
                    status: MigrationStatus.Pending
                },
                take: 1
            },
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalScout = await db.scout.count({
        where: {
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            unitId: unit.id,
            id: {
                not: scoutId
            },
            status: {
                equals: Status.Active || Status.Verified
            }
        }
    })

    const totalPage = Math.round(totalScout / itemsPerPage)

    return (
        <ContentLayout title="Unit">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/scout">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Unit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

                <Card className="mt-4">
                    <CardHeader>
                        <CardTitle>{unit.name}</CardTitle>
                        <CardDescription>Manage your unit.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h1 className="text-xl font-semibold">Total Scout <span className="text-primary font-bold">#{unit?.scouts.length}</span></h1>
                            <h1 className="text-lg font-semibold">Available Scout <span className="text-primary font-bold">#{unit.limit - unit?.scouts.length}</span></h1>
                        </div>
                        <Header />
                        <ScoutList scouts={scouts} />
                        <CustomPagination totalPage={totalPage} />
                    </CardContent>
                </Card>
        </ContentLayout>
    )
}

export default Unit