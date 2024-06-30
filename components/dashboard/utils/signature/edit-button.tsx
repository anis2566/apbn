"use client"

import { Edit } from "lucide-react"
import { Signature } from "@prisma/client"

import { Button } from "@/components/ui/button"

import { useUpdateSignature } from "@/hooks/use-signature"

interface EditButtonProps {
    signature: Signature;
    id: string;
}

export const EditButton = ({signature, id}:EditButtonProps) => {
    const {onOpen} = useUpdateSignature()
    return (
        <Button variant="ghost" className="w-full flex items-center gap-x-3 px-2 py-0 justify-start" onClick={() => onOpen(signature, id)}>
            <Edit className="w-4 h-4" />
            Edit
        </Button>
    )
}