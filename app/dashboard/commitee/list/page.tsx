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
import { Header } from "@/components/dashboard/commitee/header";
import { CommiteeList } from "@/components/dashboard/commitee";
import { db } from "@/lib/db";
import { CommiteeSection } from "@/schema/commitee.schema";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        section: CommiteeSection;
        page: string;
        perPage: string;
        search: string;
    }
};

const Commitees = async ({ searchParams }: Props) => {
    const { section, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const commitees = await db.commitee.findMany({
        where: {
            ...(section && { section }),
            ...(search && { name: { contains: search, mode: "insensitive" } })
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalCommitee = await db.commitee.count({
        where: {
            ...(section && { section }),
            ...(search && { name: { contains: search, mode: "insensitive" } })
        }
    })

    const totalPage = Math.ceil(totalCommitee / itemsPerPage)

    return (
        <ContentLayout title="Commitee">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Commitee List</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Commitee List</CardTitle>
                    <CardDescription>A collection of event.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <CommiteeList commitees={commitees} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Commitees