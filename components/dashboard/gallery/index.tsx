import { Gallery } from "@prisma/client"
import Image from "next/image"

import { DeleteButton } from "./delete-button"

interface Props {
    images: Gallery[]
}

export const GalleryList = ({ images }: Props) => {
    return (
        <div className="grid md:grid-cols-3 gap-6">
            {
                images.map(image => (
                    <div key={image.id} className="aspect-video relative">
                        <Image
                            src={image.imageUrl}
                            alt="Gallery"
                            fill
                            className="object-cover rounded-md"
                        />
                        <DeleteButton id={image.id} />
                    </div>
                ))
            }
        </div>
    )
}