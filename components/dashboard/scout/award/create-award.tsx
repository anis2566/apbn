"use client"

import { Pen } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useAwardCreate } from "@/hooks/use-award"

export const CreateAward = () => {
    const {onOpen} = useAwardCreate()

    return (
        <Button className="flex items-center gap-x-2" onClick={onOpen}>
            <Pen className="w-5 h-5" />
            Create
        </Button>
    )
}