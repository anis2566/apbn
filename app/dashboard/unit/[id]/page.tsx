import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Status } from "@prisma/client";
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

import { cn } from "@/lib/utils";
import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { RemoveLeaderButton } from "./_components/remove-leader-button";
import { AssignLeaderButton } from "./_components/assign-leader-button";
import { CustomPagination } from "@/components/custom-pagination";
import { ScoutList } from "./_components/scout-list";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "APBn Scouts | Unit Details",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    },
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
}

const Unit = async ({ params: { id }, searchParams }: Props) => {

    const unit = await db.unit.findUnique({
        where: {
            id: id
        },
        include: {
            leader: true,
        }
    })

    if (!unit) redirect("/dashboard")

    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const scouts = await db.scout.findMany({
        where: {
            unitId: id,
            status: Status.Active,
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            ...(unit.leaderId && { id: { not: unit.leaderId } })
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalScout = await db.scout.count({
        where: {
            unitId: id,
            status: Status.Active,
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            ...(unit.leaderId && { id: { not: unit.leaderId } })
        }
    })

    const totalPage = Math.ceil(totalScout / itemsPerPage)

    return (
        <ContentLayout title="Unit">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Unit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-6 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Unit Leader</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {
                            unit?.leaderId ? (
                                <RemoveLeaderButton unitId={unit.id} />
                            ) : (
                                <AssignLeaderButton unitId={unit.id} />
                            )
                        }

                        <div
                            className={cn(
                                "hidden flex-col md:flex-row items-center gap-4 p-2",
                                unit.leaderId && "flex"
                            )}
                        >
                            <Image
                                alt="Avatar"
                                className="rounded-full"
                                height="100"
                                src={unit.leader?.imageUrl || ""}
                                style={{
                                    aspectRatio: "100/100",
                                    objectFit: "cover",
                                }}
                                width="100"
                            />
                            <div className="space-y-1">
                                <div className="font-semibold text-xl text-primary">{unit.leader?.name}</div>
                                <p>{unit.leader?.phone}</p>
                                <p>{unit.leader?.apsId}</p>
                            </div>
                        </div>

                        {!unit?.leader?.id && (
                            <p className="text-muted-foreground text-center text-lx italic">No Unit Leader</p>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Scout List</CardTitle>
                        <CardDescription>A collection of scout in this unit.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Header />
                        <ScoutList scouts={scouts} unitId={id} />
                        <CustomPagination totalPage={totalPage} />
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}

export default Unit