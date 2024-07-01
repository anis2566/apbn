import { Ban, Scout } from "@prisma/client"
import { EllipsisVertical, Eye } from "lucide-react"
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
import { MigrationStatus } from "@/schema/migration.schema"
import { ViewButton } from "./view-button"
import { StatusButton } from "./status-button"
import { DeleteButton } from "./delete-button"

interface BanWithScout extends Ban {
    scout: Scout | null;
}

interface BanListProps {
    bans: BanWithScout[]
}

export const BanList = ({ bans }: BanListProps) => {
    return (
        <>
            {
                bans.length < 1 ? (
                    <Empty title="No Ban App Found" />
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
                                                    ban.status === MigrationStatus.Approved && "bg-green-500",
                                                    ban.status === MigrationStatus.Rejected && "bg-rose-500",
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
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem asChild>
                                                        <Link href={`/dashboard/scout/${ban.scoutId}`} className="flex items-center gap-x-3">
                                                            <Eye className="w-4 h-4" />
                                                            View Profile
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <ViewButton ban={ban} />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <StatusButton banId={ban.id} />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem>
                                                        <DeleteButton banId={ban.id} />
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