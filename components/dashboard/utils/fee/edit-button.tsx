"use client"

import { Pen } from "lucide-react"
import { Fee } from "@prisma/client"

import { Button } from "@/components/ui/button"

import { useUpdateFee } from "@/hooks/use-fee"

interface EditButtonProps {
    fee: Fee
}

export const EditButton = ({fee}:EditButtonProps) => {
    const {onOpen} = useUpdateFee()
    return (
        <Button variant="ghost" className="w-full flex items-center gap-x-3 px-2 py-0 justify-start" onClick={() => onOpen(fee, fee.id)}>
            <Pen className="w-4 h-4" />
            Edit
        </Button>
    )
}