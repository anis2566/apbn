"use client"

import { AppStatus, CampApplication, CampMember, PaymentStatus,  } from "@prisma/client"
import { EllipsisVertical, Eye, RefreshCcw, Trash2 } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { Empty } from "@/components/empty"
import { cn } from "@/lib/utils"
import { useEventDelete, useEventStatus } from "@/hooks/use-event-app"
import Link from "next/link"

interface EventApplicationWithScout extends CampApplication {
    members: CampMember[]
}

interface Props {
    applications: EventApplicationWithScout[]
    eventId: string;
}

export const EventApplicationList = ({ applications, eventId }: Props) => {
    const { onOpen } = useEventStatus()
    const { onOpen: onOpenDelete } = useEventDelete()

    return (
        <>
            {
                applications.length < 1 ? (
                    <Empty title="No Application Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Type</TableHead>
                                <TableHead>Unit Name</TableHead>
                                <TableHead>Leader Name</TableHead>
                                <TableHead>Leader Phone</TableHead>
                                <TableHead>Members</TableHead>
                                <TableHead>ِPayment Status</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                applications.map(application => (
                                    <TableRow key={application.id}>
                                        <TableCell className="py-3">{application.type}</TableCell>
                                        <TableCell className="py-3">{application.unitName}</TableCell>
                                        <TableCell className="py-3">{application.unitLeaderName}</TableCell>
                                        <TableCell className="py-3">{application.unitPhone}</TableCell>
                                        <TableCell className="py-3">{application.members.length}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                className={cn(
                                                    "text-white",
                                                    application.paymentStatus === PaymentStatus.Paid && "bg-green-500",
                                                    application.paymentStatus === PaymentStatus.Unpaid && "bg-rose-500",
                                                )}
                                            >
                                                {application.paymentStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                className={cn(
                                                    "text-white",
                                                    application.status === AppStatus.Approved && "bg-green-500",
                                                    application.status === AppStatus.Rejected && "bg-rose-500",
                                                )}
                                            >
                                                {application.status}
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
                                                    <DropdownMenuItem  asChild>
                                                        <Link href={`/dashboard/app/event/${eventId}/${application.id}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-5 h-5" />
                                                            <p>View Members</p>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpen(application.id)}>
                                                        <RefreshCcw className="w-5 h-5" />
                                                        <p>Change Status</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpenDelete(application.id)}>
                                                        <Trash2 className="w-5 h-5 group-hover:text-rose-600" />
                                                        <p className="group-hover:text-rose-600">Delete</p>
                                                    </DropdownMenuItem>
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