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

import { useAward } from "@/hooks/use-award"
import { DELETE_AWARD } from "../action"


export const DeleteAwardModal = () => {
    const { open, awardId, onClose } = useAward()

    const { mutate: deleteAward, isPending } = useMutation({
        mutationFn: DELETE_AWARD,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-award"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-award"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Award deleting...", {
            id: "delete-award"
        })
        deleteAward(awardId)
    }

    return (
        <AlertDialog open={open && !!awardId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete award
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