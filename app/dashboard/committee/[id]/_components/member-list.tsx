"use client"

import { CommitteeMember } from "@prisma/client"
import { Edit, EllipsisVertical, Trash2 } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

import { Empty } from "@/components/empty"
import { formatString } from "@/lib/utils"
import { useCommitteeMemberDelete, useCommitteeMemberUpdate } from "@/hooks/use-committee-member"

interface Props {
    members: CommitteeMember[]
}

export const MemberList = ({ members }: Props) => {
    const { onOpen } = useCommitteeMemberUpdate()
    const { onOpen: onOpenDelete } = useCommitteeMemberDelete()

    return (
        <>
            {
                members.length < 1 ? (
                    <Empty title="No Member Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                members.map(commitee => (
                                    <TableRow key={commitee.id}>
                                        <TableCell className="py-3">
                                            <Avatar>
                                                <AvatarImage src={commitee.imageUrl} />
                                                <AvatarFallback>{commitee.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-3">{commitee.name}</TableCell>
                                        <TableCell className="py-3">{formatString(commitee.designation)}</TableCell>
                                        <TableCell className="py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpen(commitee, commitee.id)}>
                                                        <Edit className="w-5 h-5" />
                                                        <p>Edit</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpenDelete(commitee.id)}>
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