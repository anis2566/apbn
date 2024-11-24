import { ArrowRightIcon, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"
import { CustomPagination } from "@/components/custom-pagination"
import { db } from "@/lib/prisma"

export const metadata: Metadata = {
    title: "APBn Scouts | Events",
    description: "Apbn scouts group",
};


interface Props {
    searchParams: {
        page: string;
    }
};


const Events = async ({ searchParams }: Props) => {
    const { page } = searchParams
    const itemsPerPage = 4;
    const currentPage = parseInt(page) || 1;

    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc"
        },
        skip: (currentPage - 1) * itemsPerPage,
        take: itemsPerPage,
    })

    const totalEvent = await db.event.count()

    const totalPage = Math.ceil(totalEvent / itemsPerPage)

    return (
        <div className="w-full max-w-screen-xl mx-auto my-3 px-2 md:px-0 py-4 md:py-16 space-y-8">
            <Badge className="w-fit mx-auto flex text-2xl text-primary rounded-md" variant="outline">Event List</Badge>
            <div className="w-full grid md:grid-cols-2 gap-6 mt-4">
                {
                    events.map(event => (
                        <div key={event.id} className="p-4 rounded-lg border bg-card text-card-foreground shadow-sm space-y-2">
                            <h3 className="text-2xl font-semibold leading-none tracking-tight">{event.title}</h3>
                            <div className="w-full aspect-video relative max-h-[250px]">
                                <Image
                                    src={event.imageUrl}
                                    alt="Event"
                                    fill
                                    className="rounded-md"
                                />
                            </div>

                            <div className="flex items-center gap-x-3">
                                <MapPin className="w-5 h-5" />
                                {event.venue}
                            </div>
                            <div className="flex items-center gap-x-3">
                                <p className="text-md font-semibold">Entry Fee: <span className="font-bold text-primary">&#2547;{event.entryFee > 0 ? event.entryFee : "Free"}</span></p>
                                <Badge
                                    className={cn(
                                        "bg-green-700",
                                        event.eventEnd <= new Date() && "bg-rose-500"
                                    )}
                                >
                                    {event.eventEnd <= new Date() ? "Expired" : "Running"}
                                </Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right" asChild>
                                    <Link href={`/event/${event.id}`}>
                                        See More
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <CustomPagination totalPage={totalPage} />
        </div>
    )
}

export default Events