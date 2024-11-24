import { AppStatus, Event, EventApplication, PaymentStatus } from "@prisma/client"
import { format } from "date-fns"
import Link from "next/link"

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

interface ApplicationWithEvent extends EventApplication {
    event: Event | null;
}

interface Props {
    applications: ApplicationWithEvent[]
}

export const ApplicationList = ({ applications }: Props) => {
    return (
        <>
            {
                applications.length < 1 ? (
                    <Empty title="No Application Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="py-3">Title</TableHead>
                                <TableHead className="py-3">Payment Status</TableHead>
                                <TableHead className="py-3">Status</TableHead>
                                <TableHead className="py-3">Applied At</TableHead>
                                <TableHead className="py-3">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                applications.map(application => (
                                    <TableRow key={application.id}>
                                        <TableCell className="py-3">{application.event?.title}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                className={cn(
                                                    "text-white bg-green-500",
                                                    application.paymentStatus === PaymentStatus.Unpaid && "bg-rose-500"
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
                                        <TableCell className="py-3">{format(application.createdAt, "dd MMM yyyy")}</TableCell>
                                        <TableCell>
                                            {
                                                application.event?.entryFee !== 0 && application.paymentStatus === PaymentStatus.Unpaid ? (
                                                    <Button className="h-8" asChild>
                                                        <Link href={`/scout/event/apply/${application.eventId}`}>
                                                            Pay Now
                                                        </Link>
                                                    </Button>
                                                ) : null
                                            }
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