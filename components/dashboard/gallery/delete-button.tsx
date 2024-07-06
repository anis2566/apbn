"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useGallery } from "@/hooks/use-gallery";

interface Props {
    id: string;
}

export const DeleteButton = ({id}:Props) => {
    const {onOpen} = useGallery()
    return (
        <Button variant="ghost" size="icon" className="absolute bottom-0 right-0" onClick={() => onOpen(id)}>
            <Trash2 className="w-5 h-5 text-rose-500" />
        </Button>
    )
}