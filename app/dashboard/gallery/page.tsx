import Link from "next/link";
import { Upload } from "lucide-react";

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

import { db } from "@/lib/db";
import { ContentLayout } from "@/components/dashboard"
import { GalleryList } from "@/components/dashboard/gallery";
import { Header } from "@/components/dashboard/gallery/header";
import { CustomPagination } from "@/components/custom-pagination";

interface Props {
    searchParams: {
        page: string;
        perPage: string;
        sort: string;
    }
};

const Gallery = async ({searchParams}:Props) => {
    const { sort, page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 6;
    const currentPage = parseInt(page) || 1;

    const images = await db.gallery.findMany({
        orderBy: {
            createdAt: sort === "asc" ? "asc" : "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const imageCount = await db.gallery.count()

    const totalPage = Math.ceil(imageCount / itemsPerPage)

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

            <div className="mt-4 space-y-4">
                <Button asChild className="flex items-center gap-x-3 max-w-[130px]">
                    <Link href="/dashboard/gallery/create">
                        <Upload className="w-5 h-5" />
                        Upload
                    </Link>
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle>Photos</CardTitle>
                        <CardDescription>A collection of photo.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Header />
                        <GalleryList images={images} />
                        <CustomPagination totalPage={totalPage} />
                    </CardContent>
                </Card>
            </div>
        </ContentLayout>
    )
}

export default Gallery