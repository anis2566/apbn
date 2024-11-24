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

import { useEvent } from "@/hooks/use-event"
import { DELETE_EVENT } from "../action"


export const DeleteEventModal = () => {
    const { open, id, onClose } = useEvent()

    const { mutate: deleteEvent, isPending } = useMutation({
        mutationFn: DELETE_EVENT,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-event"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-event"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Event deleting...", {
            id: "delete-event"
        })
        deleteEvent(id)
    }
    
    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete event
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