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

import { useGallery } from "@/hooks/use-gallery"
import { DELETE_GALLERY } from "@/actions/gallery.action"


export const DeleteGalleryModal = () => {
    const { open, id, onClose } = useGallery()

    const { mutate: deleteImage, isPending } = useMutation({
        mutationFn: DELETE_GALLERY,
        onSuccess: (data) => {
            onClose()
            toast.success(data?.success, {
                id: "delete-gallery"
            });
        },
        onError: (error) => {
            toast.error(error.message, {
                id: "delete-gallery"
            });
        }
    })

    const handleDelete = () => {
        toast.loading("Image deleting...", {
            id: "delete-gallery"
        })
        deleteImage(id)
    }
    
    return (
        <AlertDialog open={open && !!id}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete photo
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