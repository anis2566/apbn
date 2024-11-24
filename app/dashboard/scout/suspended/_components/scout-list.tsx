"use client"

import { EllipsisVertical, Eye, Pen, RefreshCcw, Trash2 } from "lucide-react"
import Link from "next/link"
import { Scout, Status, Unit } from "@prisma/client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { cn } from "@/lib/utils"
import { useScoutCard, useScoutDelete, useScoutStatus } from "@/hooks/use-scout"
import { Empty } from "@/components/empty"

interface ScoutWithUnit extends Scout {
    unit: Unit | null
}

interface RequestListProps {
    scouts: ScoutWithUnit[]
}

export const ScoutList = ({ scouts }: RequestListProps) => {

    const { onOpen } = useScoutStatus()
    const { onOpen: onOpenDelete } = useScoutDelete()
    const { onOpen: onOpenCard } = useScoutCard()

    return (
        <>
            {
                scouts.length < 1 ? (
                    <Empty title="No Scout found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>APS Id</TableHead>
                                <TableHead>Phone</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Unit</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                scouts.map(scout => (
                                    <TableRow key={scout.id}>
                                        <TableCell className="py-2">
                                            <Avatar>
                                                <AvatarImage src={scout.imageUrl} />
                                                <AvatarFallback>{scout.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-2">{scout.name}</TableCell>
                                        <TableCell className="py-2">{scout.apsId}</TableCell>
                                        <TableCell className="py-2">{scout.phone}</TableCell>
                                        <TableCell className="py-2">
                                            <Badge variant="outline">{scout.section}</Badge>
                                        </TableCell>
                                        <TableCell className="py-2">{scout.unit?.name}</TableCell>
                                        <TableCell className="py-2">
                                            <Badge
                                                className={cn(
                                                    "text-white",
                                                    scout.status === Status.Active && "bg-green-500",
                                                    scout.status === Status.Verified && "bg-green-500",
                                                    scout.status === Status.Suspended && "bg-rose-500",
                                                )}
                                            >
                                                {scout.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/scout/${scout.id}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-4 h-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/scout/edit/${scout.id}`} className="flex items-center gap-x-3">
                                                            <Pen className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpen(scout.id)}>
                                                        <RefreshCcw className="w-4 h-4" />
                                                        Change Status
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpenDelete(scout.id)}>
                                                        <Trash2 className="text-rose-500 w-4 h-4" />
                                                        Delete
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