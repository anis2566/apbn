"use client"

import { format } from "date-fns"
import { Edit, EllipsisVertical, Trash2 } from "lucide-react"
import Link from "next/link"
import { Training } from "@prisma/client"

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
import { useTraining } from "@/hooks/use-training"

interface Props {
    trainings: Training[]
}

export const TrainingList = ({ trainings }: Props) => {
    const {onOpen} = useTraining()

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
                                <TableHead>Type</TableHead>
                                <TableHead>Limit</TableHead>
                                <TableHead>Participants</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                trainings.map(training => (
                                    <TableRow key={training.id}>
                                        <TableCell className="py-3">{training.title}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge>
                                                {training.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3">{training.limit}</TableCell>
                                        <TableCell className="py-3">20</TableCell>
                                        <TableCell className="py-3">
                                            {format(training.trainingStart, "dd MMM yyyy")} -
                                            {" "} {format(training.trainingEnd, "dd MMM yyyy")}
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
                                                        <Link href={`/dashboard/training/edit/${training.id}`} className="flex items-center gap-x-3">
                                                            <Edit className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(training.id)}>
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