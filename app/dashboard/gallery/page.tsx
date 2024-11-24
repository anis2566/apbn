import Link from "next/link";
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

import { ContentLayout } from "../_components/content-layout"
import { db } from "@/lib/prisma";
import { GalleryList } from "./_components/gallery-list";
import { CustomPagination } from "@/components/custom-pagination";

export const metadata: Metadata = {
    title: "APBn Scouts | Gallery",
    description: "Apbn scouts group",
};

interface Props {
    searchParams: {
        page: string;
        perPage: string;
    }
};

const Gallery = async ({ searchParams }: Props) => {
    const { page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 8;
    const currentPage = parseInt(page) || 1;

    const galleries = await db.gallery.findMany({
        orderBy: {
            createdAt: "desc"
        },
        include: {
            media: {
                select: {
                    id: true
                }
            }
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalGallery = await db.gallery.count()

    const totalPage = Math.ceil(totalGallery / itemsPerPage)

    return (
        <ContentLayout title="Gallery">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Gallery</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>


            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Gallery List</CardTitle>
                    <CardDescription>A collection of gallery.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <GalleryList galleries={galleries} />
                    <CustomPagination totalPage={totalPage} />
                </CardContent>
            </Card>

        </ContentLayout>
    )
}

export default Gallery