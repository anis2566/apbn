import { EllipsisVertical } from "lucide-react"
import { Award } from "@prisma/client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { EditButton } from "./edit-button"
import { Empty } from "@/components/empty"
import { DeleteButton } from "./delete-button"

interface AwardWithScout extends Award {
    scouts: {
        scoutId: string;
    }[]
}

interface AwardListProps {
    awards: AwardWithScout[]
}

export const AwardList = ({ awards }: AwardListProps) => {
    return (
        <>
            {
                awards.length < 1 ? (
                    <Empty title="Award Not found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Image</TableHead>
                                <TableHead>Obtained</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                awards.map(award => (
                                    <TableRow key={award.id}>
                                        <TableCell className="py-3">{award.title}</TableCell>
                                        <TableCell className="py-3">
                                            <Avatar>
                                                <AvatarImage src={award.imageUrl} />
                                                <AvatarFallback>{award.title.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-3">{award.scouts.length}</TableCell>
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
                                                        <EditButton awardId={award.id} award={award} />
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <DeleteButton awardId={award.id} />
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