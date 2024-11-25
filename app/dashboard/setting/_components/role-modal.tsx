"use client"

import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import { Role } from "@prisma/client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"

import { useUpdateUserStatus } from "@/hooks/use-user"
import { UPDATE_USER_ROLE } from "../action"


export const RoleModal = () => {
    const [role, setRole] = useState<Role>(Role.User)

    const { open, userId, onClose } = useUpdateUserStatus()

    const { mutate: updateRole, isPending } = useMutation({
        mutationFn: UPDATE_USER_ROLE,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "update-status"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "update-status"
            });
        }
    })

    const handleUpdate = () => {
        toast.loading("Status updating...", {
            id: "update-status"
        })
        updateRole({ userId, role })
    }

    return (
        <Dialog open={open && !!userId} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>User Role</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                    <Select onValueChange={(value) => setRole(value as Role)} disabled={isPending}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value={Role.Moderator}>Moderator</SelectItem>
                            <SelectItem value={Role.User}>User</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button disabled={isPending} onClick={handleUpdate}>Update</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}