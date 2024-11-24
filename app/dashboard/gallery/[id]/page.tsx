import { redirect } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import { Upload } from "lucide-react";

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { db } from "@/lib/prisma";
import { ContentLayout } from "../../_components/content-layout";
import { Button } from "@/components/ui/button";
import ImageList from "./_components/image-list";

export const metadata: Metadata = {
    title: "APBn Scouts | Gallery Photos",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    },
    searchParams: {
        page: string;
        perPage: string;
    }
}

const Gallery = async ({ params: { id }, searchParams }: Props) => {
    const { page, perPage } = searchParams
    const itemsPerPage = parseInt(perPage) || 8;
    const currentPage = parseInt(page) || 1;

    const gallery = await db.gallery.findUnique({
        where: {
            id: id
        },
        
    })

    if (!gallery) redirect("/dashboard")

    const images = await db.galleryMedia.findMany({
        where: {
            galleryId: id
        }
    })

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
                        <BreadcrumbLink asChild>
                            <Link href="/dashboard/gallery">Gallery</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage>Photos</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="space-y-4">
                <Link href={`/dashboard/gallery/${id}/upload`}>
                    <Button className="mt-4 flex items-center gap-x-2">
                        <Upload className="w-5 h-5" />
                        Upload
                    </Button>
                </Link>

                <ImageList images={images} />
            </div>
        </ContentLayout>
    )
}

export default Gallery