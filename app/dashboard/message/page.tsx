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

import { db } from "@/lib/db";
import { ContentLayout } from "@/components/dashboard"
import { MessageList } from "@/components/dashboard/message";
import { Header } from "@/components/dashboard/gallery/header";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        sort: string;
    }
};

const Messages = async ({searchParams}:Props) => {
    const { sort, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 5;
    const currentPage = parseInt(page) || 1;

    const messages = await db.message.findMany({
        orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalMessage = await db.message.count()

    const totalPage = Math.ceil(totalMessage / itemsPerPage)

    return (
        <ContentLayout title="Message">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Message</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Messages</CardTitle>
                    <CardDescription>A collection of message.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Header />
                    <MessageList messages={messages} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>
        </ContentLayout>
    )
}

export default Messages