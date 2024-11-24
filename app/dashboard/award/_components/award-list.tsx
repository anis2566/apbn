"use client"

import { Edit, EllipsisVertical, Trash2 } from "lucide-react"
import Link from "next/link"
import { Award } from "@prisma/client"

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
import { Button } from "@/components/ui/button"

import { Empty } from "@/components/empty"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAward } from "@/hooks/use-award"

interface Props {
    awards: Award[]
}

export const AwardList = ({ awards }: Props) => {
    const { onOpen } = useAward()

    return (
        <>
            {
                awards.length < 1 ? (
                    <Empty title="No Award Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Participants</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                awards.map(award => (
                                    <TableRow key={award.id}>
                                        <TableCell className="py-3">
                                            <Avatar>
                                                <AvatarImage src={award.imageUrl} />
                                                <AvatarFallback>A</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-3">{award.title}</TableCell>
                                        <TableCell className="py-3">20</TableCell>
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
                                                        <Link href={`/dashboard/award/edit/${award.id}`} className="flex items-center gap-x-3">
                                                            <Edit className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(award.id)}>
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