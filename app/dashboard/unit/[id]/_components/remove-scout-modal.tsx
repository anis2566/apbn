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

import { useRemoveScout } from "@/hooks/use-unit"
import { REMOVE_SCOUT } from "../action"

export const RemoveScoutModal = () => {
    const { open, scoutId, unitId, onClose } = useRemoveScout()

    const { mutate: removeScout, isPending } = useMutation({
        mutationFn: REMOVE_SCOUT,
        onSuccess: (data) => {
            onClose()
            toast.success(data.success, {
                id: "remove-scout"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "remove-scout"
            });
        }
    })

    const handleRemove = () => {
        toast.loading("Scout removing...", {
            id: "remove-scout"
        })
        removeScout({ scoutId, unitId })
    }

    return (
        <AlertDialog open={open && !!scoutId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will remove scout from this unit.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={onClose} disabled={isPending}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleRemove} disabled={isPending}>Continue</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}