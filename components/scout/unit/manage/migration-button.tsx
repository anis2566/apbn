"use client"

import { RefreshCcwDot } from "lucide-react"

import { useMigrationLeader } from "@/hooks/use-migration";

interface EditButtonProps {
    scoutId: string;
}

export const MigrationButton = ({scoutId}:EditButtonProps) => {
    const {onOpen} = useMigrationLeader()

    return (
        <div className="relative flex gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(scoutId)}>
            <RefreshCcwDot className="w-4 h-4" />
            Apply Migration
        </div>
    )
}