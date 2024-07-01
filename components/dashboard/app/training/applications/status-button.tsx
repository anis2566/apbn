"use client"

import { RefreshCcw } from "lucide-react"

import { useTrainingAppStatus } from "@/hooks/use-training-app";

interface StatusButtonProps {
    id: string;
}

export const StatusButton = ({ id }: StatusButtonProps) => {
    const { onOpen } = useTrainingAppStatus()

    return (
        <div className="relative flex gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(id)}>
            <RefreshCcw className="w-4 h-4" />
            Change Status
        </div>
    )
}