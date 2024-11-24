"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button";

import { useGallery } from "@/hooks/use-gallery";

interface DeleteButtonProps {
    id: string;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
    const { onOpen } = useGallery()

    return (
        <Button variant="ghost" size="icon" onClick={() => onOpen(id)} className="z-50">
            <Trash2 className="w-5 h-5 text-rose-500" />
        </Button>
    )
}