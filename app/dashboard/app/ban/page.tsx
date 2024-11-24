import Link from "next/link";
import { AppStatus } from "@prisma/client";
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

import { CustomPagination } from "@/components/custom-pagination";
import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { Header } from "../migration/_components/header";
import { BanList } from "./_components/app-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Ban Applications",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        status: AppStatus;
        page: string;
        perPage: string;
        search: string;
    }
};

const BanApp = async ({ searchParams }: Props) => {

    const { status, search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const bans = await db.ban.findMany({
        where: {
            ...(status && { status }),
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            })
        },
        include: {
            scout: true
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalBans = await db.ban.count({
        where: {
            ...(status && { status }),
            ...(search && {
                scout: {
                    name: {
                        contains: search, mode: "insensitive"
                    }
                }
            })
        }
    })

    const totalPage = Math.round(totalBans / itemsPerPage)

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
                        <BreadcrumbPage>Bans</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Ban List</CardTitle>
                    <CardDescription>A collection of ban application.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <BanList bans={bans} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default BanApp;