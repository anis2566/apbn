import { ThreeDPhotoCarousel } from "@/components/magicui/three-d-carousel"
import { db } from "@/lib/db"

export const Gallery = async () => {

    const images = await db.gallery.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 15
    })

    return (
        <div className="py-4 md:py-8 space-y-8">
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">Gallery</div>
                <p className="text-muted-foreground">Latest photo collection.</p>
            </div>
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