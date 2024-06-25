"use client"

import { Trash2 } from "lucide-react"

import { useRemoveScout } from "@/hooks/use-unit";

interface EditButtonProps {
    scoutId: string;
    unitId: string;
}

export const DeleteButton = ({scoutId, unitId}:EditButtonProps) => {
    const {onOpen} = useRemoveScout()

    return (
        <div className="relative flex gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm text-rose-500 hover:text-rose-700 outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={ () => onOpen(scoutId, unitId)}>
            <Trash2 className="w-4 h-4" />
            Remove
        </div>
    )
}