"use client"

import { RefreshCcwDot } from "lucide-react"

import { useMigrationLeader } from "@/hooks/use-migration";
import { Section } from "@prisma/client";

interface EditButtonProps {
    scoutId: string;
    section: Section;
    unitId: string;
}

export const MigrationButton = ({scoutId, section, unitId}:EditButtonProps) => {
    const {onOpen} = useMigrationLeader()

    return (
        <div className="relative flex gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(scoutId, section, unitId)}>
            <RefreshCcwDot className="w-4 h-4" />
            Apply Migration
        </div>
    )
}