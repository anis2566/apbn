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

import { useTraining } from "@/hooks/use-training"
import { DELETE_TRAINING } from "../action"


export const DeleteTrainingModal = () => {
    const { open, id, onClose } = useTraining()

    const { mutate: deleteTraining, isPending } = useMutation({
        mutationFn: DELETE_TRAINING,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-training"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-training"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Training deleting...", {
            id: "delete-training"
        })
        deleteTraining(id)
    }

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete training
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