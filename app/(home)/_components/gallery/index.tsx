import { db } from "@/lib/prisma"
import { GalleryList } from "./gallery-list"
import { ThreeDPhotoCarousel } from "@/components/magicui/three-d-carousel";

interface Props {
    searchParams: {
        title: string;
    }
}

export const Gallery = async ({ searchParams: { title } }: Props) => {

    const galleries = await db.gallery.findMany({
        orderBy: {
            createdAt: "desc"
        },
    })

    const images = await db.galleryMedia.findMany({
        where: {
            ...(title && {
                gallery: {
                    title: {
                        contains: title,
                        mode: "insensitive"
                    }
                }
            })
        }
    })

    return (
        <div className="py-4 md:py-8 space-y-8">
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">Gallery</div>
                <p className="text-muted-foreground">Latest photo collection.</p>
            </div>
            <GalleryList galleries={galleries} />
            <div className="w-full">
                <div className="flex flex-col justify-center space-y-4">
                    <div className="p-2">
                        <ThreeDPhotoCarousel images={images} />
                    </div>
                </div>
            </div>
        </div>
    )
}