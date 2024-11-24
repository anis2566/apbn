"use client"

import { Scout } from "@prisma/client"
import { EllipsisVertical, Eye, RefreshCcw, Trash2 } from "lucide-react"
import Link from "next/link"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Empty } from "@/components/empty"
import { useRemoveScout } from "@/hooks/use-unit"
import { useMigration } from "@/hooks/use-migration"

interface ScoutListProps {
    scouts: Scout[];
    unitId: string;
}

export const ScoutList = ({ scouts, unitId }: ScoutListProps) => {
    const {onOpen} = useRemoveScout()
    const {onOpen:onOpenMigration} = useMigration()

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
                                <TableHead>APS ID</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                scouts.map(scout => (
                                    <TableRow key={scout.id}>
                                        <TableCell className="py-3">
                                            <Avatar>
                                                <AvatarImage src={scout.imageUrl} />
                                                <AvatarFallback>{scout.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-3">{scout.name}</TableCell>
                                        <TableCell className="py-3">{scout?.apsId}</TableCell>
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
                                                        <Link href={`/dashboard/scout/${scout.id}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-5 h-5" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpenMigration(scout.id)}>
                                                        <RefreshCcw className="w-5 h-5" />
                                                        <p>Migration</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(scout.id, unitId)}>
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