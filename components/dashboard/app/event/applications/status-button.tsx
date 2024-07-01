"use client"

import { RefreshCcw } from "lucide-react"

import { useStatusChange } from "@/hooks/use-event-app";

interface StatusButtonProps {
    appId: string;
}

export const StatusButton = ({ appId }: StatusButtonProps) => {
    const { onOpen } = useStatusChange()

    return (
        <div className="relative flex justify-start gap-x-2 items-center cursor-default select-none items-center rounded-sm py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(appId)}>
            <RefreshCcw className="w-4 h-4" />
            Change Status
        </div>
    )
}