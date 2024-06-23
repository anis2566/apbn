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

import { useUnit } from "@/hooks/use-unit"
import { DELETE_UNIT } from "@/actions/unit.action"


export const DeleteUnitModal = () => {
    const { open, unitId, onClose } = useUnit()

    const { mutate: deleteBrand, isPending } = useMutation({
        mutationFn: DELETE_UNIT,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-unit"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-unit"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Unit deleting...", {
            id: "delete-unit"
        })
        deleteBrand(unitId)
    }
    
    return (
        <AlertDialog open={open && !!unitId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your unit
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