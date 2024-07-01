"use client"

import { Trash2 } from "lucide-react"

import { useMigrationDelete } from "@/hooks/use-migration";

interface DeleteButtonProps {
    migrationId: string;
}

export const DeleteButton = ({migrationId}:DeleteButtonProps) => {
    const {onOpen} = useMigrationDelete()

    return (
        <div className="relative flex justify-start gap-x-2 items-center cursor-default select-none items-center rounded-sm py-1.5 text-sm text-rose-500 hover:text-rose-700 outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(migrationId)}>
            <Trash2 className="w-4 h-4" />
            Delete
        </div>
    )
}