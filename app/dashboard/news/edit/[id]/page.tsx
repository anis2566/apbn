import Link from "next/link";
import { redirect } from "next/navigation";
import { Metadata } from "next";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/prisma";
import { ContentLayout } from "@/app/dashboard/_components/content-layout";
import { EditNewsForm } from "./_components/edit-news-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit News",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const EditNews = async ({ params: { id } }: Props) => {
    const news = await db.news.findUnique({
        where: {
            id
        }
    })

    if (!news) redirect("/dashboard")

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
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/news">News</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditNewsForm news={news} />
        </ContentLayout>
    )
}

export default EditNews