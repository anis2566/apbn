"use client"

import { Edit, EllipsisVertical, Trash2 } from "lucide-react"
import { Fee } from "@prisma/client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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

import { useDeleteFee, useUpdateFee } from "@/hooks/use-fee"

interface FeeListProps {
    fees: Fee[]
}

export const FeeList = ({ fees }: FeeListProps) => {
    const {onOpen} = useDeleteFee()
    const {onOpen: onOpenUpdate} = useUpdateFee()
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Fee List</CardTitle>
                <CardDescription>
                    A collection of your fee.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>D. Amount</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            fees.map(fee => (
                                <TableRow key={fee.id}>
                                    <TableCell className="py-3 capitalize">{fee.title}</TableCell>
                                    <TableCell className="py-3">&#2547;{fee.amount}</TableCell>
                                    <TableCell className="py-3">&#2547;{fee.discountAmount}</TableCell>
                                    <TableCell className="py-3">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <EllipsisVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpenUpdate(fee, fee.id)}>
                                                    <Edit className="w-5 h-5" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(fee.id)}>
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
            </CardContent>
        </Card>
    )
}