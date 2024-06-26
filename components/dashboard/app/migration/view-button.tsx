"use client"

import { Eye } from "lucide-react"
import { Migration, Unit } from "@prisma/client";

import { useMigrationView } from "@/hooks/use-migration";

interface MigrationWithScout extends Migration {
    scout: {
        name: string;
    } | null;
    unit: Unit | null;
}

interface ViewButtonProps {
    migration: MigrationWithScout;
}

export const ViewButton = ({ migration }: ViewButtonProps) => {
    const { onOpen } = useMigrationView()

    return (
        <div className="relative flex gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(migration)}>
            <Eye className="w-4 h-4" />
            View
        </div>
    )
}