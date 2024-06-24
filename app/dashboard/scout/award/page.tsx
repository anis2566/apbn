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
import { CreateAward } from "@/components/dashboard/scout/award/create-award";
import { Header } from "@/components/dashboard/scout/award/header";
import { db } from "@/lib/db";
import { AwardList } from "@/components/dashboard/scout/award";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const Award = async ({searchParams}:Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;  
    const currentPage = parseInt(page) || 1;

    const awards = await db.award.findMany({
        where: {
            ...(search && {title: {contains: search, mode: "insensitive"}})
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

    const totalAward = await db.award.count({
        where: {
            ...(search && {title: {contains: search, mode: "insensitive"}})
        }
    })

    const totalPage = Math.round(totalAward / itemsPerPage)


    return (
        <ContentLayout title="Award">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Award</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="mt-4 space-y-6">
                <CreateAward />
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Award List</CardTitle>
                    <CardDescription>A collection of award.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <AwardList awards={awards} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Award