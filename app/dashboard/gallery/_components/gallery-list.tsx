import { Gallery } from "@prisma/client"
import { Edit } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Empty } from "@/components/empty"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

import { DeleteButton } from "./delete-button"

interface GalleryWithMedia extends Gallery {
    media: {id: string}[]
}

interface Props {
    galleries: GalleryWithMedia[]
}

export const GalleryList = ({ galleries }: Props) => {
    return (
        <div>
            <div className="grid md:grid-cols-4 gap-6">
                {
                    galleries.map(gallery => (
                        <Card className="apsect-square relative" key={gallery.id}>
                            <CardContent className="pt-5">
                                <Link href={`/dashboard/gallery/${gallery.id}`}>
                                    <Image
                                        src={gallery.imageUrl}
                                        alt="banner"
                                        width={200}
                                        height={200}
                                        className="w-full max-h-[150px] mx-auto rounded-md"
                                    />
                                </Link>
                                <h4 className="text-lg font-semibold truncate mt-2">{gallery.title}</h4>
                                <div className="flex gap-x-3 items-center">
                                    <Button variant="ghost" size="icon" asChild>
                                        <Link href={`/dashboard/gallery/edit/${gallery.id}`}>
                                            <Edit className="w-5 h-5" />
                                        </Link>
                                    </Button>
                                    <DeleteButton id={gallery.id} />
                                    <p className="text-muted-foreground">{gallery.media.length} Images</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>

            {galleries.length === 0 && (
                <div className="w-full min-h-[50vh] flex items-center justify-center italic">
                    <Empty title="No News Found" />
                </div>
            )}
        </div>
    )
}