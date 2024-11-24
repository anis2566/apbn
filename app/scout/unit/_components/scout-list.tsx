"use client"

import { AppStatus, Ban, Migration, Scout } from "@prisma/client"
import { BanIcon, EllipsisVertical, Eye, RefreshCcw } from "lucide-react"
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

import { Empty } from "@/components/empty"
import { cn } from "@/lib/utils"
import { useMigrationLeader } from "@/hooks/use-migration"
import { useBan } from "@/hooks/use-ban"

interface ScoutWithMigrationAndBan extends Scout {
    migrations: Migration[];
    bans: Ban[];
}

interface Props {
    scouts: ScoutWithMigrationAndBan[]
}

export const ScoutList = ({ scouts }: Props) => {
    const { onOpen } = useMigrationLeader()
    const { onOpen: onOpenBan } = useBan()

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
                                <TableHead>APS ID</TableHead>
                                <TableHead>Migration Status</TableHead>
                                <TableHead>Ban Status</TableHead>
                                <TableHead>Card</TableHead>
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
                                            <Badge
                                                className={cn(
                                                    "text-white bg-indigo-500",
                                                    scout?.migrations[0]?.status === AppStatus.Pending && "bg-amber-500",
                                                    scout?.migrations[0]?.status === AppStatus.Approved && "bg-green-500",
                                                    scout?.migrations[0]?.status === AppStatus.Rejected && "bg-rose-500",
                                                )}
                                            >
                                                {scout?.migrations?.length < 1 ? "N/A" : scout?.migrations[0]?.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                className={cn(
                                                    "text-white bg-indigo-500",
                                                    scout?.bans[0]?.status === AppStatus.Pending && "bg-amber-500",
                                                    scout?.bans[0]?.status === AppStatus.Approved && "bg-green-500",
                                                    scout?.bans[0]?.status === AppStatus.Rejected && "bg-rose-500",
                                                )}
                                            >
                                                {scout?.bans?.length < 1 ? "N/A" : scout?.bans[0]?.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="py-2">
                                            <Badge className={cn("bg-indigo-500", scout.allowCard && "bg-green-500")}>
                                                {scout.allowCard ? "Approved" : "N/A"}
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
                                                            <Eye className="w-5 h-5" />
                                                            View
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpen(scout.id, scout.section, scout.unitId ?? "")}>
                                                        <RefreshCcw className="w-5 h-5" />
                                                        <p>Apply Migration</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpenBan(scout.id)}>
                                                        <BanIcon className="w-5 h-5 group-hover:text-rose-600" />
                                                        <p className="group-hover:text-rose-600">Apply Ban</p>
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