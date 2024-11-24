import { Event } from "@prisma/client"
import Link from "next/link"
import { MoveRight } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import { Empty } from "@/components/empty"
import { cn } from "@/lib/utils"

interface EventWithApp extends Event {
    applications: {id: string}[]
}

interface Props {
    events: EventWithApp[]
}

export const EventList = ({ events }: Props) => {
    return (
        <>
            {
                events.length < 1 ? (
                    <Empty title="No Event Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Participants</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                events.map(event => (
                                    <TableRow key={event.id}>
                                        <TableCell className="py-3">{event.title}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                className={cn(
                                                    "text-white bg-green-500",
                                                    event.eventEnd <= new Date() && "bg-rose-500"
                                                )}
                                            >
                                                {event.eventEnd <= new Date() ? "Expired" : "Running"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3">{event.applications.length}</TableCell>
                                        <TableCell className="py-3">
                                            <Button size="icon" asChild>
                                                <Link href={`/dashboard/app/event/${event.id}`}>
                                                    <MoveRight className="w-5 h-5" />
                                                </Link>
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                )
            }
        </>
    )
}