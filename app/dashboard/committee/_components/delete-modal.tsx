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

import { useCommittee } from "@/hooks/use-committee"
import { DELETE_COMMITEE } from "../action"


export const DeleteCommiteeModal = () => {
    const { open, id, onClose } = useCommittee()

    const { mutate: deleteCommitee, isPending } = useMutation({
        mutationFn: DELETE_COMMITEE,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-commitee"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-commitee"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Commitee deleting...", {
            id: "delete-commitee"
        })
        deleteCommitee(id)
    }

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete commitee
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