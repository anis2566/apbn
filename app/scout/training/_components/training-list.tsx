import { Training } from "@prisma/client"
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

interface Props {
    trainings: Training[]
}

export const TrainingList = ({ trainings }: Props) => {
    return (
        <>
            {
                trainings.length < 1 ? (
                    <Empty title="No Training Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                trainings.map(training => (
                                    <TableRow key={training.id}>
                                        <TableCell className="py-3">{training.title}</TableCell>
                                        <TableCell className="py-3">
                                            {format(training.trainingStart, "dd MMM yyyy")} -
                                            {" "} {format(training.trainingEnd, "dd MMM yyyy")}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Badge>
                                                {training.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Button>
                                                <Link href={`/scout/training/apply/${training.id}`}>
                                                    Get Certify
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