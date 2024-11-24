"use client"

import { Gallery } from "@prisma/client"
import { usePathname, useRouter } from "next/navigation"
import queryString from "query-string"

interface Props {
    galleries: Gallery[]
}

export const GalleryList = ({ galleries }: Props) => {
    const pathname = usePathname()
    const router = useRouter()

    const handleClick = (title: string) => {
        const url = queryString.stringifyUrl({
            url: pathname,
            query: {
                title
            }
        }, { skipEmptyString: true, skipNull: true })
        router.push(url)
    }

        return (
            <div className="flex items-center gap-x-3">
                {
                    galleries.map(gallery => (
                        <div key={gallery.id} className="border-2 border-primary rounded-full p-2 w-[200px]" onClick={() => handleClick(gallery.title)}>
                            <div className="flex items-center gap-x-2">
                                <img
                                    src={gallery.imageUrl}
                                    alt={gallery.title}
                                    width={100}
                                    height={100}
                                    className="w-14 h-14 rounded-full mx-auto"
                                />
                            </div>
                            <h1 className="text-center">{gallery.title}</h1>
                        </div>
                    ))
                }
            </div>
        )
    }