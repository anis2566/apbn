import Link from "next/link";
import Image from "next/image";
import { Edit } from "lucide-react";
import { PublishStatus } from "@prisma/client";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import { Empty } from "@/components/empty";
import { CustomPagination } from "@/components/custom-pagination";
import { db } from "@/lib/prisma";
import { ContentLayout } from "../_components/content-layout";
import { DeleteButton } from "./_components/delete-button";

export const metadata: Metadata = {
    title: "APBn Scouts | News",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
    }
};

const News = async ({ searchParams }: Props) => {
    const { page } = searchParams
    const itemsPerPage = 4;
    const currentPage = parseInt(page) || 1;

    const newses = await db.news.findMany({
        where: {
            status: PublishStatus.Publish
        },
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalNews = await db.news.count({
        where: {
            status: PublishStatus.Publish
        },
    })

    const totalPage = Math.ceil(totalNews / itemsPerPage)

    return (
        <ContentLayout title="News">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Create</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>News List</CardTitle>
                    <CardDescription>A collection of news</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                        {
                            newses.map(news => (
                                <Card key={news.id}>
                                    <CardContent className="pt-4">
                                        <div className="relative aspect-video mx-auto">
                                            <Image
                                                src={news.imageUrl}
                                                alt="banner"
                                                fill
                                                className="object-cover mx-auto rounded-md"
                                            />
                                        </div>
                                        <h4 className="text-lg font-semibold">{news.title}</h4>
                                        <div className="flex gap-x-3 items-center">
                                            <Button variant="ghost" size="icon" asChild>
                                                <Link href={`/dashboard/news/edit/${news.id}`}>
                                                    <Edit className="w-5 h-5" />
                                                </Link>
                                            </Button>
                                            <DeleteButton id={news.id} />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        }
                    </div>

                    {newses.length === 0 && (
                        <div className="w-full min-h-[50vh] flex items-center justify-center italic">
                            <Empty title="No News Found" />
                        </div>
                    )}
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default News