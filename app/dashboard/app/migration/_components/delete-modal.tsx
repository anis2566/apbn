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

import { useMigrationDelete } from "@/hooks/use-migration"
import { DELETE_MIGRATION } from "../action"


export const DeleteMigrationModal = () => {
    const { open, migrationId, onClose } = useMigrationDelete()

    const { mutate: deleteMigration, isPending } = useMutation({
        mutationFn: DELETE_MIGRATION,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-migration"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-migration"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Migration deleting...", {
            id: "delete-migration"
        })
        deleteMigration(migrationId)
    }

    return (
        <AlertDialog open={open && !!migrationId}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete this ban application
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