"use client"

import { AppStatus, Migration, Scout, Unit } from "@prisma/client"
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
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { Empty } from "@/components/empty"
import { cn } from "@/lib/utils"
import { useMigrationDelete, useMigrationStatus, useMigrationView } from "@/hooks/use-migration"

interface ScoutWithUnit extends Scout {
    unit: {
        name: string;
        id: string;
    } | null
}

interface MigrationWithScout extends Migration {
    scout: ScoutWithUnit | null;
    unit: Unit | null;
}

interface MigrationListProps {
    migrations: MigrationWithScout[]
}

export const MigrationList = ({ migrations }: MigrationListProps) => {
    const { onOpen } = useMigrationView()
    const {onOpen: onOpenStatus} = useMigrationStatus()
    const {onOpen: onOpenDelete} = useMigrationDelete()

    return (
        <>
            {
                migrations.length < 1 ? (
                    <Empty title="No Application found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>C. Unit</TableHead>
                                <TableHead>M. Unit</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                migrations.map(migration => (
                                    <TableRow key={migration.id}>
                                        <TableCell className="py-3">
                                            <Avatar>
                                                <AvatarImage src={migration.scout?.imageUrl} />
                                                <AvatarFallback>{migration.scout?.name?.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-3">{migration.scout?.name}</TableCell>
                                        <TableCell className="py-3">{migration.scout?.unit?.name}</TableCell>
                                        <TableCell className="py-3">{migration.unit?.name}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge
                                                className={cn(
                                                    "text-white",
                                                    migration.status === AppStatus.Approved && "bg-green-500",
                                                    migration.status === AppStatus.Rejected && "bg-rose-500",
                                                )}
                                            >
                                                {migration.status}
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
                                                        <Link href={`/dashboard/scout/${migration.scoutId}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-5 h-5" />
                                                            View Profile
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpen(migration)}>
                                                        <File className="w-5 h-5" />
                                                        <p>View Application</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpenStatus(migration.id)}>
                                                        <RefreshCcw className="w-5 h-5" />
                                                        <p>Change Status</p>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpenDelete(migration.id)}>
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