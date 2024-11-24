"use client"

import { Signature } from "@prisma/client"
import { Edit, EllipsisVertical, Trash2 } from "lucide-react"

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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

import { useDeleteSignature, useUpdateSignature } from "@/hooks/use-signature"

interface Props {
    signatures: Signature[]
}

export const SignatureList = ({ signatures }: Props) => {
    const {onOpen} = useUpdateSignature()
    const {onOpen: onOpenDelete} = useDeleteSignature()

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Signature List</CardTitle>
                <CardDescription>
                    A collection of your signature.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Author</TableHead>
                            <TableHead>Signature</TableHead>
                            <TableHead>Action</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            signatures.map(signature => (
                                <TableRow key={signature.id}>
                                    <TableCell className="py-3 capitalize">{signature.author}</TableCell>
                                    <TableCell className="py-3">
                                        <Avatar>
                                            <AvatarImage src={signature.imageUrl} />
                                            <AvatarFallback>{signature.author.charAt(0)}</AvatarFallback>
                                        </Avatar>
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
                                                <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpen(signature, signature.id)}>
                                                    <Edit className="w-5 h-5" />
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpenDelete(signature.id)}>
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