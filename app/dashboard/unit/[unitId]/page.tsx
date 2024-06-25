import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { ContentLayout } from "@/components/dashboard"
import { AssignLeaderButton } from "@/components/dashboard/unit/assign-leader-button";
import { db } from "@/lib/db";
import { RemoveLeaderButton } from "@/components/dashboard/unit/remove-leader-button";
import { cn } from "@/lib/utils";
import { Header } from "@/components/dashboard/unit/unit-details/header";
import { ScoutList } from "@/components/dashboard/unit/unit-details/scout-list";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    params: {
        unitId: string;
    },
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
}

const Unit = async ({ params: { unitId }, searchParams }: Props) => {

    const unit = await db.unit.findUnique({
        where: {
            id: unitId
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
            unitId,
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
            unitId,
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            ...(unit.leaderId && { id: { not: unit.leaderId } })
        }
    })

    const totalPage = Math.round(totalScout / itemsPerPage)

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
                        <CardDescription>A collection of scout of this unit.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Header />
                        <ScoutList scouts={scouts} unitId={unitId} />
                        <CustomPagination totalPage={totalPage} />
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}

export default Unit