"use client"

import { Committee } from "@prisma/client"
import { Edit, EllipsisVertical, Eye, Trash2 } from "lucide-react"
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
import { formatString } from "@/lib/utils"
import { useCommittee } from "@/hooks/use-committee"

interface CommitteeWithMembers extends Committee {
    members: {id: string}[]
}

interface Props {
    committees: CommitteeWithMembers[]
}

export const CommiteeList = ({ committees }: Props) => {
    const { onOpen } = useCommittee()

    return (
        <>
            {
                committees.length < 1 ? (
                    <Empty title="No Commitee Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Start</TableHead>
                                <TableHead>End</TableHead>
                                <TableHead>Members</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                committees.map(committee => (
                                    <TableRow key={committee.id}>
                                        <TableCell className="py-3">{committee.title}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge>
                                                {formatString(committee.section)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            {format(committee.start, "dd MMM yyyy")}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            {format(committee.end, "dd MMM yyyy")}
                                        </TableCell>
                                        <TableCell className="py-3">
                                            {committee.members.length}
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
                                                        <Link href={`/dashboard/committee/${committee.id}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-5 h-5" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/committee/edit/${committee.id}`} className="flex items-center gap-x-3">
                                                            <Edit className="w-5 h-5" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(committee.id)}>
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