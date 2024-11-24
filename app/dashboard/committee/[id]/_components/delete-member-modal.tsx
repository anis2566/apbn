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

import { useCommitteeMemberDelete } from "@/hooks/use-committee-member"
import { DELETE_MEMBER } from "../action"


export const DeleteMemberModal = () => {
    const { open, id, onClose } = useCommitteeMemberDelete()

    const { mutate: deleteCommitee, isPending } = useMutation({
        mutationFn: DELETE_MEMBER,
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
                        This action cannot be undone. This will permanently delete member
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