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

import { useScoutDelete } from "@/hooks/use-scout"
import { DELETE_SCOUT } from "../action"

export const DeleteScoutModal = () => {
    const { open, scoutId, onClose } = useScoutDelete()

    const { mutate: deleteScout, isPending } = useMutation({
        mutationFn: DELETE_SCOUT,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-scout"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-scout"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Scout deleting...", {
            id: "delete-scout"
        })
        deleteScout(scoutId)
    }

    return (
        <AlertDialog open={open && !!scoutId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete scout
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