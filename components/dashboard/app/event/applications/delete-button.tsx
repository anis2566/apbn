"use client"

import { Trash2 } from "lucide-react"

import { useDeleteEventApp } from "@/hooks/use-event-app";

interface DeleteButtonProps {
    appId: string;
}

export const DeleteButton = ({appId}:DeleteButtonProps) => {
    const {onOpen} = useDeleteEventApp()

    return (
        <div className="relative flex gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-rose-500 hover:text-rose-700 outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(appId)}>
            <Trash2 className="w-4 h-4" />
            Delete
        </div>
    )
}