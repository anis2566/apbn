"use client"

import { File } from "lucide-react"
import { Ban, Scout } from "@prisma/client";

import { useBanView } from "@/hooks/use-ban";

interface BanWithScout extends Ban {
    scout: Scout | null;
  }
  
  interface ViewButtonProps {
    ban: BanWithScout
  }

export const ViewButton = ({ ban }: ViewButtonProps) => {
    const { onOpen } = useBanView()

    return (
        <div className="relative flex gap-x-2 items-center cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50" onClick={() => onOpen(ban)}>
            <File className="w-4 h-4" />
            View App
        </div>
    )
}