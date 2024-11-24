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

import { useDeleteSignature } from "@/hooks/use-signature"
import { DELETE_SIGNATURE } from "../action"

export const DeleteSignatureModal = () => {
    const { open, id, onClose } = useDeleteSignature()

    const { mutate: deleteCoupon, isPending } = useMutation({
        mutationFn: DELETE_SIGNATURE,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-signature"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-signature"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Signature deleting...", {
            id: "delete-signature"
        })
        deleteCoupon(id)
    }

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your signature
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