"use client"

import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useDeleteFee } from "@/hooks/use-fee";

interface ActionButtonProps {
    feeId: string;
}

export const ActionButton = ({feeId}:ActionButtonProps) => {
    const { onOpen } = useDeleteFee()
    
    return (
        <Button variant="ghost" className="w-full flex items-center gap-x-3 px-2 py-0 justify-start text-rose-500 hover:text-rose-700" onClick={() => onOpen(feeId)}>
            <Trash2 className="w-4 h-4" />
            Delete
        </Button>
    )
}