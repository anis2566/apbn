import Link from "next/link";
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

import { ContentLayout } from "../../_components/content-layout"
import { db } from "@/lib/prisma";
import { AddMemberButton } from "./_components/add-member-button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MemberList } from "./_components/member-list";
import { Header } from "../../event/_components/header";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "APBn Scouts | Committee Members",
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


const Committee = async ({ params: { id }, searchParams }: Props) => {
    const { search, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const committee = await db.committee.findUnique({
        where: {
            id
        }
    })

    if (!committee) redirect("/dashboard")

    const members = await db.committeeMember.findMany({
        where: {
            ...(search && { name: { contains: search, mode: "insensitive" } })
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalMember = await db.committeeMember.count({
        where: {
            ...(search && { name: { contains: search, mode: "insensitive" } })
        },
    })

    const totalPage = Math.ceil(totalMember / itemsPerPage)

    return (
        <ContentLayout title="Committee">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/committee">Committees</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Members</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="space-y-5">
                <AddMemberButton id={id} />
                <Card>
                    <CardHeader>
                        <CardTitle>Member List</CardTitle>
                        <CardDescription>A collection of committee member.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Header />
                        <MemberList members={members} />
                        <CustomPagination totalPage={totalPage} />
                    </CardContent>
                </Card>
            </div>


        </ContentLayout>
    )
}

export default Committee