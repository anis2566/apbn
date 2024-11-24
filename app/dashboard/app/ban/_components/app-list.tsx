"use client"

import { AppStatus, Ban, Scout } from "@prisma/client"
import { EllipsisVertical, Eye, File, RefreshCcw, Trash2 } from "lucide-react"
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
import { useBanDelete, useBanStatus, useBanView } from "@/hooks/use-ban"

interface BanWithScout extends Ban {
    scout: Scout | null;
}

interface BanListProps {
    bans: BanWithScout[]
}

export const BanList = ({ bans }: BanListProps) => {
    const { onOpen } = useBanView()
    const { onOpen: onOpenStatus } = useBanStatus()
    const {onOpen: onOpenDelete} = useBanDelete()

    return (
        <>
            {
                bans.length < 1 ? (
                    <Empty title="No Application Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                bans.map(ban => (
                                    <TableRow key={ban.id}>
                                        <TableCell className="py-3">
                                            <Avatar>
                                                <AvatarImage src={ban.scout?.imageUrl} />
                                                <AvatarFallback>{ban.scout?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-3">{ban.scout?.name}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                className={cn(
                                                    "text-white",
                                                    ban.status === AppStatus.Approved && "bg-green-500",
                                                    ban.status === AppStatus.Rejected && "bg-rose-500",
                                                )}
                                            >
                                                {ban.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <span className="sr-only">Open menu</span>
                                                        <EllipsisVertical className="h-5 w-5" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/scout/${ban.scoutId}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-5 h-5" />
                                                            View Profile
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpen(ban)}>
                                                        <File className="w-5 h-5" />
                                                        <p>View Application</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpenStatus(ban.id)}>
                                                        <RefreshCcw className="w-5 h-5" />
                                                        <p>Change Status</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpenDelete(ban.id)}>
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