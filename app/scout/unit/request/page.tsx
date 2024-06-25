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
import { ScoutList } from "@/components/scout/unit/request";
import { CustomPagination } from "@/components/custom-pagination";
import { Status } from "@/schema/scout.schema";

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
    })

    if (!unit) redirect("/scout")

    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const scouts = await db.scout.findMany({
        where: {
            ...(search && {name: {contains: search, mode: "insensitive"}}),
            id: {
                not: scoutId
            },
            preferedUnit: unit.id,
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
                not: scoutId
            },
            preferedUnit: unit.id,
            status: Status.Pending
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