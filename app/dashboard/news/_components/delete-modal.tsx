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

import { useNews } from "@/hooks/use-news"
import { DELETE_NEWS } from "../action"


export const DeleteNewsModal = () => {
    const { open, id, onClose } = useNews()

    const { mutate: deleteNews, isPending } = useMutation({
        mutationFn: DELETE_NEWS,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-news"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-news"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("News deleting...", {
            id: "delete-news"
        })
        deleteNews(id)
    }

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete news
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