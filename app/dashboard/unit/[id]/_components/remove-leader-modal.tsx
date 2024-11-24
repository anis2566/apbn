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

import { useRemoveUnitLeader } from "@/hooks/use-unit"
import { REMOVE_LEADER } from "../action"


export const RemoveLeaderModal = () => {
    const { open, unitId, onClose } = useRemoveUnitLeader()

    const { mutate: removeLeader, isPending } = useMutation({
        mutationFn: REMOVE_LEADER,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "remove-leader"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "remove-leader"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Leader removing...", {
            id: "remove-leader"
        })
        removeLeader(unitId)
    }

    return (
        <AlertDialog open={open && !!unitId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently remove leader data from your servers.
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