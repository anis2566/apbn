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

import { useDeleteFee } from "@/hooks/use-fee"
import { DELETE_FEE } from "@/actions/fee.action"


export const DeleteFeeModal = () => {
    const { open, feeId, onClose } = useDeleteFee()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: DELETE_FEE,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-fee"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-fee"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Fee deleting...", {
            id: "delete-fee"
        })
        deleteBrand(feeId)
    }
    
    return (
        <AlertDialog open={open && !!feeId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your fee
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