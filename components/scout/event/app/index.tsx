import { Event, EventApplication } from "@prisma/client"
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
import { PaymentStatus } from "@/schema/event-application.schema"
import { cn } from "@/lib/utils"
import { MigrationStatus } from "@/schema/migration.schema"

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
                    <Empty title="No Event Application Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Applied At</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                applications.map(application => (
                                    <TableRow key={application.id}>
                                        <TableCell className="py-1">{application.event?.title}</TableCell>
                                        <TableCell className="py-1">
                                            <Badge
                                                className={cn(
                                                    "text-white bg-green-500",
                                                    application.paymentStatus === PaymentStatus.Unpaid && "bg-rose-500"
                                                )}
                                            >
                                                {application.paymentStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-1">
                                            <Badge
                                                className={cn(
                                                    "text-white",
                                                    application.status === MigrationStatus.Approved && "bg-green-500",
                                                    application.status === MigrationStatus.Rejected && "bg-rose-500",
                                                )}
                                            >
                                                {application.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-1">{format(application.createdAt, "dd MMM yyyy")}</TableCell>
                                        <TableCell>
                                            {
                                                application.paymentStatus === PaymentStatus.Paid ? null : (
                                                    <Button className="h-8" asChild>
                                                        <Link href={`/scout/event/apply/${application.eventId}`}>
                                                            Pay
                                                        </Link>
                                                    </Button>
                                                )
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