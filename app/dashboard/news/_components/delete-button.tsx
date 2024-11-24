"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button";

import { useNews } from "@/hooks/use-news";

interface DeleteButtonProps {
    id: string;
}

export const DeleteButton = ({ id }: DeleteButtonProps) => {
    const { onOpen } = useNews()

    return (
        <Button variant="ghost" size="icon" onClick={() => onOpen(id)}>
            <Trash2 className="w-5 h-5 text-rose-500" />
        </Button>
    )
}