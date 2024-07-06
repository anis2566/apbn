"use client"

import { Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useNotice } from "@/hooks/use-notice";

interface Props {
    id: string;
}

export const DeleteButton = ({id}:Props) => {
    const {onOpen} = useNotice()

    return (
        <Button variant="ghost" size="icon" onClick={() => onOpen(id)}>
            <Trash2 className="w-5 h-5 text-rose-500" />
        </Button>
    )
}