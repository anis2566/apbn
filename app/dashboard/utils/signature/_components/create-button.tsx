"use client"

import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useSignature } from "@/hooks/use-signature"

export const CreateSignatureButton = () => {
    const { onOpen } = useSignature()
    return (
        <Button className="mt-4 flex items-center gap-x-2" onClick={onOpen}>
            <PlusCircle className="w-5 h-5" />
            Create
        </Button>
    )
}