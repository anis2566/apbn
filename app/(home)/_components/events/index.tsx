import { format } from "date-fns"
import Image from "next/image"
import { ArrowRightIcon, Calendar, DollarSign, FilePen, MapPin } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"

import { db } from "@/lib/prisma"

export const Events = async () => {
    const events = await db.event.findMany({
        orderBy: {
            createdAt: "desc"
        },
        take: 1
    })

    return (
        <div className="py-4 md:py-8 space-y-8">
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">Upcoming Events</div>
                <p className="text-muted-foreground">Checkout the latest event.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
                {
                    events.map(event => (
                        <div className="relative aspect-video overflow-hidden group" key={event.id}>
                            <Image
                                src={event.imageUrl}
                                alt={event.title}
                                fill
                                className="object-cover rounded-md"
                            />
                            <div className="absolute bottom-0 md:-bottom-20 left-0 w-full bg-transparent/20 dark:bg-transparent/60 p-2 rounded-tr-3xl rounded-tl-3xl space-y-2 px-4 group-hover:bottom-0 transition-all duration-600">
                                <div className="flex justify-between items-center text-white">
                                    <div>
                                        <h3 className="text-xl font-semibold">{event.title}</h3>
                                        <div className="flex items-center gap-x-3">
                                            <MapPin className="w-5 h-5 text-primary" />
                                            <p>{event.venue}</p>
                                        </div>
                                    </div>
                                    <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right" className="hidden md:flex" asChild>
                                        <Link href={`/event/${event.id}`}>
                                            View
                                        </Link>
                                    </Button>
                                </div>
                                <div className="text-white hidden md:block">
                                    <div className="flex items-center gap-x-3">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        <p>Date:</p>
                                        <p>{format(event.eventStart, "dd MMM yyyy")} - {format(event.eventEnd, "dd MMM yyyy")}</p>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <FilePen className="w-5 h-5 text-primary" />
                                        <p>Registration:</p>
                                        <p>{format(event.registrationStart, "dd MMM yyyy")} - {format(event.registrationEnd, "dd MMM yyyy")}</p>
                                    </div>
                                    <div className="flex items-center gap-x-3">
                                        <DollarSign className="w-5 h-5 text-primary" />
                                        <p>Fee:</p>
                                        <p>&#2547;{event.entryFee}</p>
                                    </div>
                                </div>
                                <Button variant="expandIcon" Icon={ArrowRightIcon} iconPlacement="right" className="md:hidden" asChild>
                                    <Link href={`/event/${event.id}`}>
                                        View
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))
                }
                <div className="relative aspect-video">
                    <Image
                        src="/hero-banner2.png"
                        alt="Banner"
                        fill
                        className="object-contain rounded-md"
                    />
                </div>
            </div>
        </div>
    )
} 