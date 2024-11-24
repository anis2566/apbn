import Link from "next/link";
import { AppStatus, Status } from "@prisma/client";
import { Metadata } from "next";
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

import { GET_SCOUT } from "@/services/user.service";
import { db } from "@/lib/prisma";
import { ContentLayout } from "../_components/content-layout";
import { Header } from "./_components/header";
import { CustomPagination } from "@/components/custom-pagination";
import { ScoutList } from "./_components/scout-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Manage Unit",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const Unit = async ({ searchParams }: Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const { scout } = await GET_SCOUT()

    const unit = await db.unit.findUnique({
        where: {
            leaderId: scout.id
        },
        include: {
            scouts: {
                where: {
                    status: Status.Active,
                    id: {
                        not: scout.id
                    }
                },
                select: {
                    id: true
                }
            }
        }
    })

    if (!unit) redirect("/scout")

    const scouts = await db.scout.findMany({
        where: {
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            unitId: unit.id,
            id: {
                not: scout.id
            },
            status: {
                equals: Status.Active
            }
        },
        include: {
            migrations: {
                where: {
                    status: AppStatus.Pending
                },
                take: 1
            },
            bans: {
                where: {
                    status: AppStatus.Pending
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
                not: scout.id
            },
            status: {
                equals: Status.Active
            }
        }
    })

    const totalPage = Math.ceil(totalScout / itemsPerPage)

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