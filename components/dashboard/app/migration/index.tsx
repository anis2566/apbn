import { Migration, Scout, Unit } from "@prisma/client"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { MigrationStatus } from "@/schema/migration.schema"
import { EllipsisVertical} from "lucide-react"
import { ViewButton } from "./view-button"
import { StatusButton } from "./status-button"

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
    return (
        <>
            {
                migrations.length < 1 ? (
                    <Empty title="No Migration found" />
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
                                                    migration.status === MigrationStatus.Approved && "bg-green-500",
                                                    migration.status === MigrationStatus.Rejected && "bg-rose-500",
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
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                     <DropdownMenuItem asChild>
                                                        <ViewButton migration={migration} />
                                                    </DropdownMenuItem>
                                                     <DropdownMenuItem asChild>
                                                        <StatusButton migrationId={migration.id} />
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