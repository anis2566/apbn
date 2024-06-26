import Link from "next/link";

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
import { db } from "@/lib/db";
import { UnitList } from "@/components/dashboard/unit";
import { Section } from "@/schema/unit.schema";
import { Header } from "@/components/dashboard/unit/header";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        section: Section;
        page: string;
        perPage: string;
        search: string;
    }
};

const Unit = async ({ searchParams }: Props) => {
    const { section, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const units = await db.unit.findMany({
        where: {
            ...(section && { section }),
            ...(search && { name: { contains: search, mode: "insensitive" } })
        },
        include: {
            scouts: {
                select: {
                    id: true
                }
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalUnit = await db.unit.count({
        where: {
            ...(section && { section }),
            ...(search && { name: { contains: search, mode: "insensitive" } })
        }
    })

    const totalPage = Math.round(totalUnit / itemsPerPage)

    console.log(units[0])

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
                        <BreadcrumbPage>Units</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Unit List</CardTitle>
                    <CardDescription>A collection of your unit.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <UnitList units={units} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Unit;