"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useUnit } from "@/hooks/use-unit"

interface ActionButtonProps {
    unitId: string;
}

export const ActionButton = ({unitId}:ActionButtonProps) => {
    const { onOpen } = useUnit()
    
    return (
        <Button variant="ghost" className="w-full flex items-center gap-x-3 px-2 py-0 justify-start text-rose-500 hover:text-rose-700" onClick={() => onOpen(unitId)}>
            <Trash2 className="w-4 h-4" />
            Delete
        </Button>
    )
}