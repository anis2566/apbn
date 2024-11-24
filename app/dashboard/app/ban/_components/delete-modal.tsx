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

import { useBanDelete } from "@/hooks/use-ban"
import { DELETE_BAN } from "../action"


export const DeleteBanModal = () => {
    const { open, banId, onClose } = useBanDelete()

    const { mutate: deleteBan, isPending } = useMutation({
        mutationFn: DELETE_BAN,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-ban"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-ban"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Ban application deleting...", {
            id: "delete-ban"
        })
        deleteBan(banId)
    }

    return (
        <AlertDialog open={open && !!banId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this ban application
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