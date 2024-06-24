"use client"

import { useAwardUpdate } from "@/hooks/use-award"
import { Award } from "@prisma/client";
import { Pen } from "lucide-react"

interface EditButtonProps {
    awardId: string;
    award: Award
}

export const EditButton = ({awardId, award}:EditButtonProps) => {
    const {onOpen} = useAwardUpdate()

    return (
        <div className="relative flex gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(awardId, award)}>
            <Pen className="w-4 h-4" />
            Edit
        </div>
    )
}