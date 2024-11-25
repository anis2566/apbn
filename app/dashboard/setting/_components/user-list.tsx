"use client"

import { User } from "@prisma/client"
import { EllipsisVertical, RefreshCcw, Trash2 } from "lucide-react"

import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { useUser, useUpdateUserStatus } from "@/hooks/use-user"

interface UserListProps {
    users: User[]
}

export const UserList = ({ users }: UserListProps) => {
    const { onOpen } = useUser()
    const { onOpen: onOpenUpdateUserStatus } = useUpdateUserStatus()

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Image</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell className="py-2">{user.name}</TableCell>
                        <TableCell className="py-2">
                            <Avatar>
                                <AvatarFallback>
                                    {user.name?.charAt(0)}
                                </AvatarFallback>
                                <AvatarImage src={user.image || ""} />
                            </Avatar>
                        </TableCell>
                        <TableCell className="py-2">{user.email}</TableCell>
                        <TableCell className="py-2">{user.role}</TableCell>
                        <TableCell className="py-2">
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                        <span className="sr-only">Open menu</span>
                                        <EllipsisVertical className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem className="flex items-center gap-x-3" onClick={() => onOpenUpdateUserStatus(user.id)}>
                                        <RefreshCcw className="w-5 h-5" />
                                        <p >Change Role</p>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex items-center gap-x-3 text-rose-500 group" onClick={() => onOpen(user.id)}>
                                        <Trash2 className="w-5 h-5 group-hover:text-rose-600" />
                                        <p className="group-hover:text-rose-600">Delete</p>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}