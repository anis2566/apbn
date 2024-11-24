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

import { useGalleryMedia } from "@/hooks/use-gallery-media"
import { DELETE_GALLERY_MEDIA } from "../action"

export const DeleteGalleryMediaModal = () => {
    const { open, id, onClose } = useGalleryMedia()

    const { mutate: deleteGalley, isPending } = useMutation({
        mutationFn: DELETE_GALLERY_MEDIA,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-image"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-image"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Image deleting...", {
            id: "delete-image"
        })
        deleteGalley(id)
    }

    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete Image
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