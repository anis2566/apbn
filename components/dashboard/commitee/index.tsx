import { Commitee } from "@prisma/client"
import { Edit, EllipsisVertical } from "lucide-react"
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
import { formatString } from "@/lib/utils"
import { DeleteButton } from "./delete-button"

interface Props {
    commitees: Commitee[]
}

export const CommiteeList = ({ commitees }: Props) => {
    return (
        <>
            {
                commitees.length < 1 ? (
                    <Empty title="No Commitee Found" />
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Image</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Designation</TableHead>
                                <TableHead>Section</TableHead>
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                commitees.map(commitee => (
                                    <TableRow key={commitee.id}>
                                        <TableCell className="py-3">
                                            <Avatar>
                                                <AvatarImage src={commitee.imageUrl} />
                                                <AvatarFallback>{commitee.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                        </TableCell>
                                        <TableCell className="py-3">{commitee.name}</TableCell>
                                        <TableCell className="py-3">{commitee.designation}</TableCell>
                                        <TableCell className="py-3">
                                            <Badge>
                                                {formatString(commitee.section)}
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
                                                        <Link href={`/dashboard/commitee/edit/${commitee.id}`} className="flex items-center gap-x-3">
                                                            <Edit className="w-4 h-4" />
                                                            Edit
                                                        </Link>
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <DeleteButton id={commitee.id} />
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