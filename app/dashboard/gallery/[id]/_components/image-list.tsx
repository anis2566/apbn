"use client"

import { GalleryMedia } from "@prisma/client"
import { Trash2 } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"

import { useGalleryMedia } from "@/hooks/use-gallery-media"

interface Props {
    images: GalleryMedia[]
}

export const ImageList = ({ images }: Props) => {
    const {onOpen} = useGalleryMedia()

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {
                images.map(image => (
                    <div key={image.id} className="space-y-2">
                        <div className="relative aspect-video mt-2" >
                            <Image
                                alt="Upload"
                                fill
                                className="object-cover rounded-md mx-auto"
                                src={image.imageUrl}
                            />
                            <Button type="button" className="absolute top-0 right-0" variant="ghost" size="icon" onClick={() => onOpen(image.id)}>
                                <Trash2 className="text-rose-500" />
                            </Button>
                        </div>
                        <p className="truncate text-lg">{image.title}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default ImageList