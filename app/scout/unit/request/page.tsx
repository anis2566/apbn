import Link from "next/link";
import { redirect } from "next/navigation";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { GET_SCOUT } from "@/services/user.service";
import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { ScoutList } from "./_components/scout-list";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "./_components/header";

export const metadata: Metadata = {
    title: "APBn Scouts | Scout Request",
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
    })

    if(!unit) redirect("/scout")

    const scouts = await db.scout.findMany({
        where: {
            ...(search && {name: {contains: search, mode: "insensitive"}}),
            id: {
                not: scout.id
            },
            preferedUnitId: unit.id,
            status: Status.Pending
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalScout = await db.scout.count({
        where: {
            ...(search && {name: {contains: search, mode: "insensitive"}}),
            id: {
                not: scout.id
            },
            preferedUnitId: unit.id,
            status: Status.Pending
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
                        <BreadcrumbLink asChild>
                            <Link href="/scout/unit">Unit</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Request</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Scout Request</CardTitle>
                    <CardDescription>Manage your scout request.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <ScoutList scouts={scouts} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Unit