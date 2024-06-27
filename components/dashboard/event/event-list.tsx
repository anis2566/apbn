import { Event } from "@prisma/client"
import { EllipsisVertical, Eye, Pen } from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { Empty } from "@/components/empty"
import { cn } from "@/lib/utils"

interface EventWithApplication extends Event {
    applications: {
        id: string;
    }[]
}

interface EventListProps {
    events: EventWithApplication[]
}

export const EventList = ({ events }: EventListProps) => {
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
                                <TableHead>Date</TableHead>
                                <TableHead>Entry Fee</TableHead>
                                <TableHead>Participants</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                events.map(event => (
                                    <TableRow key={event.id}>
                                        <TableCell className="py-3">{event.title}</TableCell>
                                        <TableCell className="py-3">{format(event.eventStart, "dd MMM yyyy")} - {format(event.eventEnd, "dd MMM yyyy")}</TableCell>
                                        <TableCell className="py-3">&#2547;{event.entryFee > 0 ? event.entryFee : "Free"}</TableCell>
                                        <TableCell className="py-3">{event.applications.length}</TableCell>
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
                                        <TableCell className="py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/event/${event.id}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-4 h-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/event/edit/${event.id}`} className="flex items-center gap-x-3">
                                                            <Pen className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    {/* <DropdownMenuItem asChild>
                                                        <ViewButton ban={ban} />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <StatusButton banId={ban.id} />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <DeleteButton banId={ban.id} />
                                                    </DropdownMenuItem> */}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
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