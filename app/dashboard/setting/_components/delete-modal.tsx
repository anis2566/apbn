"use client"

import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"

import { useUser } from "@/hooks/use-user"
import { DELETE_USER } from "../action"

export const DeleteUserModal = () => {
    const { open, userId, onClose } = useUser()

    const { mutate: deleteUser, isPending } = useMutation({
        mutationFn: DELETE_USER,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-user"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-user"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("User deleting...", {
            id: "delete-user"
        })
        deleteUser(userId)
    }

    return (
        <AlertDialog open={open && !!userId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete user
                        and remove the data from your servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete} disabled={isPending}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}