"use client"

import { Scout } from "@prisma/client"
import { EllipsisVertical, Eye, RefreshCcw } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { cn } from "@/lib/utils"
import { Empty } from "@/components/empty"
import { useScoutStatusLeader } from "@/hooks/use-scout"

interface ScoutListProps {
    scouts: Scout[]
}

export const ScoutList = ({ scouts }: ScoutListProps) => {
    const { onOpen } = useScoutStatusLeader()

    return (
        <>
            {
                scouts.length < 1 ? (
                    <Empty title="Scout Not found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Payment Status</TableHead>
                                <TableHead>Status</TableHead>
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
                                        <TableCell className="py-3">
                                            <Badge
                                                className={cn(
                                                    "text-white bg-rose-500",
                                                    scout.isPaid && "bg-green-500"
                                                )}
                                            >
                                                {scout.isPaid ? "Paid" : "Unpaid"}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge>
                                                {scout.status}
                                            </Badge>
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
                                                        <Link href={`/scout/unit/${scout.id}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-4 h-4" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="w-flex items-center gap-x-3" onClick={() => onOpen(scout.id)}>
                                                        <RefreshCcw className="w-4 h-4" />
                                                        Change Status
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