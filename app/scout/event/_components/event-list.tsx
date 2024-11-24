import { Event } from "@prisma/client"
import { LogIn, MoveRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { cn } from "@/lib/utils"

interface EventListProps {
    events: Event[]
}

export const EventList = ({ events }: EventListProps) => {
    return (
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
                            <p className="text-xl font-semibold">Entry Fee: <span className="font-bold text-primary">&#2547;{event.entryFee > 0 ? event.entryFee : "Free"}</span></p>
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
                            <Button className="flex items-center gap-x-1 group" variant="outline" asChild>
                                <Link href={`/scout/event/${event.id}`}>
                                    See More
                                    <MoveRight className="transition ease-in-out duration-300 group-hover:translate-x-2" />
                                </Link>
                            </Button>
                            <Button
                                className={cn(
                                    "flex items-center gap-x-1 group",
                                    event.eventEnd <= new Date() ? "hidden" : ""
                                )}
                                asChild
                            >
                                <Link href={`/scout/event/apply/${event.id}`}>
                                    Join
                                    <LogIn className="transition ease-in-out duration-300 group-hover:translate-x-2" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}