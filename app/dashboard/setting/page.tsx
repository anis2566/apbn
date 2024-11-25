import Link from "next/link";
import { Metadata } from "next";
import { Role } from "@prisma/client";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

import { ContentLayout } from "../_components/content-layout";
import { db } from "@/lib/prisma";
import { UserList } from "./_components/user-list";
import { CustomPagination } from "@/components/custom-pagination";
import { Header } from "../event/_components/header";

export const metadata: Metadata = {
    title: "APBn Scouts | Setting",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        search: string;
    }
};

const Setting = async ({ searchParams }: Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const users = await db.user.findMany({
        where: {
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            role: {
                not: Role.Admin
            }
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalUser = await db.user.count({
        where: {
            ...(search && { name: { contains: search, mode: "insensitive" } }),
            role: {
                not: Role.Admin
            }
        }
    })

    const totalPage = Math.ceil(totalUser / itemsPerPage)

    return (
        <ContentLayout title="Setting">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Setting</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>User List</CardTitle>
                    <CardDescription>A collection of your user.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Header />
                    <UserList users={users} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Setting
