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
import { EditGalleryForm } from "./_components/edit-gallery-form";

export const metadata: Metadata = {
    title: "APBn Scouts | Edit Gallery",
    description: "Apbn scouts group",
};

interface Props {
    params: {
        id: string;
    }
}

const EditGallery = async ({ params: { id } }: Props) => {

    const gallery = await db.gallery.findUnique({
        where: {
            id: id
        }
    })

    if (!gallery) redirect("/dashboard")

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
                        <BreadcrumbPage>Edit</BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <EditGalleryForm gallery={gallery} />
        </ContentLayout>
    )
}

export default EditGallery