import { AppStatus, Training, TrainingApplication } from "@prisma/client"
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

import { Empty } from "@/components/empty"
import { cn } from "@/lib/utils"

interface AppWithScout extends TrainingApplication {
    training: Training | null;
}

interface Props {
    trainings: AppWithScout[]
}

export const ApplicationList = ({ trainings }: Props) => {
    return (
        <>
            {
                trainings.length < 1 ? (
                    <Empty title="No Application Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Applied At</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                trainings.map(application => (
                                    <TableRow key={application.id}>
                                        <TableCell className="py-3">{application.training?.title}</TableCell>
                                        <TableCell className="py-3">{format(application.createdAt, "dd MMM yyyy")}</TableCell>
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